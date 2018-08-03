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

exports.submitForm = async (request, response) => {
  const number = request.body.number;
  const email = request.body.email;
  const message = request.body.message;
  const name = request.body.name;
  const subject = `Message from ${request.body.name} `;
  await mail.send({
    filename: "contact",
    name,
    subject,
    number,
    email,
    message
  });
  request.flash("success", `Successfully Sent`);
  response.redirect("/");
};

// save to MONGODB
// exports.submitForm = async (request, response) => {
//   const contactForm = await (new ContactForm(request.body)).save()
//   request.flash('success', `Successfully Sent`)
//   response.redirect('/contact')
//   mail.send({
//     subject: '',
//     filename:'contact'
//   })
// }
