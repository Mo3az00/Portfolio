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

router.post("/contact",
  ContactFormController.validationRules,
  ContactFormController.errorHandling,
  catchErrors(ContactFormController.submitContactForm)
);

// Export our router
module.exports = router;
