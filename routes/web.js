const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/errorHandlers");
const ContactFormController = require("../controllers/ContactFormController");

// The main route
router.get("/", (request, response) => {
  response.render("layout", {
    title: "Home",
    description: "My portfolio"
  });
});

// router.get("/about", (request, response) => {
//   response.render("about", {
//     title: "About",
//     description: "My portfolio"
//   });
// });

// router.get("/services", (request, response) => {
//   response.render("services", {
//     title: "Services",
//     description: "My portfolio"
//   });
// });

// router.get("/projects", (request, response) => {
//   response.render("projects", {
//     title: "projects",
//     description: "My portfolio"
//   });
// });

// router.get("/contact", (request, response) => {
//   response.render("contact", {
//     title: "Contact",
//     description: "My portfolio based on Node.js"
//   });
// });

// router.get("/vision", (request, response) => {
//   response.render("vision", {
//     title: "TEST",
//     description: "My portfolio based on Node.js"
//   });
// });

router.post("/", catchErrors(ContactFormController.submitForm));

// Export our router
module.exports = router;
