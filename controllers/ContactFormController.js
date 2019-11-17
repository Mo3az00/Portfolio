const mongoose = require("mongoose");
// mongoose.Promise = global.Promise
// const ContactForm = mongoose.model('ContactForm')
// const crypto = require('crypto');
const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const passport = require("passport");
const promisify = require("es6-promisify");
const mail = require("../handlers/mail");
const { body, validationResult } = require("express-validator");
const moment = require("moment");

// Validation rules are applied before any other middleware
exports.validationRules = [
  body(["name", "email", "message"], "Please fill this field.").isLength({
    min: 1
  }),
  body("email", "Please supply a valid email address.").isEmail(),
  // body("phone", "Please supply a valid number.").isLength({ min: 5}),
  body("message", "Minimum characters must be 10 .").isLength({ min: 10 }),
  body("message").custom(value => {
    return new Promise((resolve, reject) => {
      if (/\[[^\]]+]/g.test(value)) {
        reject(Error("BB Code is not allowed"));
      }

      resolve();
    });
  })
];

// Handling validation errors
exports.errorHandling = (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(422).json({
      code: 422,
      message: "Your message could not be send! Please check your data.",
      errors: errors.mapped()
    });
  }

  next();
};

// Sending the form data, after successful validation
exports.submitContactForm = async (request, response) => {
  try {
    const dateNow = moment().format("YYYY-MM-DD HH:mm");

    await mail.send({
      filename: "contact",
      subject: `Contact Form - ${dateNow}`,
      replyTo: request.body.email,
      name: request.body.name,
      email: request.body.email,
      message: request.body.message,
      phone: request.body.phone
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      error: error.message,
      message: "Something went wrong sending the email. Please try again later."
    });
  }
  return response.json({
    code: 200,
    message: "OK"
  });
};

// save to MONGODB
// exports.sendMail = async (request, response) => {
//   const contactForm = await (new ContactForm(request.body)).save()
//   request.flash('success', `Successfully Sent`)
//   response.redirect('/contact')
//   mail.send({
//     subject: '',
//     filename:'contact'
//   })
// }
