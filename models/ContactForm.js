const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "You must supply your name"
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: "You must supply your Email"
  },
  message: {
    type: String,
    trim: true,
    required: "You must enter a message min 10 characters"
  }
});

module.exports = mongoose.model("ContactForm", contactFormSchema);
