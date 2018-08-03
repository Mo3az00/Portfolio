// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = obj => JSON.stringify(obj, null, 2);

// Main navigation (currently supports max. 1 sub-level)
exports.navigation = [
  { name: "Home", href: "#my", dataScroll: "my" },
  { name: "About Me", href: "#about", dataScroll: "about" },
  { name: "Technologies", href: "#technologies", dataScroll: "technologies" },
  { name: "Services", href: "#services", dataScroll: "services" },
  { name: "My Projects", href: "#projects", dataScroll: "projects" },
  { name: "Contact Me", href: "#contact", dataScroll: "contact" }
];
