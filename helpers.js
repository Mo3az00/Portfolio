// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = obj => JSON.stringify(obj, null, 2);

// Main navigation (currently supports max. 1 sub-level)
exports.navigation = [
  { name: "Home", href: "#my", dataScroll: "my" },
  { name: "About Me", href: "#about", dataScroll: "about" },
  { name: "Services", href: "#services", dataScroll: "services" },
  { name: "My Projects", href: "#projects", dataScroll: "projects" },
  { name: "Contact Me", href: "#contact", dataScroll: "contact" }
];

exports.projects = [
  // {
  //   name: "Node Friends",
  //   link: "https://node-friends.com",
  //   imgSrc: "/images/projects/node-friends.jpg",
  //   imgAlt: "Node Friends"
  // },
  {
    name: "BreweryDB API",
    link: "https://brewerey-db-api.herokuapp.com/",
    imgSrc: "/images/projects/brewerydb.jpg",
    imgAlt: "BreweryDB API",
    description: "Have a quick look about many sorts of beers !"
  },
  {
    name: "MARVEL API",
    link: "https://codepen.io/Mo3aZ/pen/jYrOQg",
    imgSrc: "/images/projects/marvel.jpg",
    imgAlt: "MARVEL API",
    description: "Search your favorite MARVEL characters"
  },
  {
    name: "YouTube API",
    link: "https://codepen.io/Mo3aZ/pen/GBxrBp",
    imgSrc: "/images/projects/youtube.jpg",
    imgAlt: "YouTube API",
    description: ""
  },
  {
    name: "Github API",
    link: "https://codepen.io/Mo3aZ/pen/BJEJpm",
    imgSrc: "/images/projects/github.jpg",
    imgAlt: "GITHUB API",
    description: ""
  },
  {
    name: "MAPS API",
    link: "https://codepen.io/Mo3aZ/pen/eyyBqQ?editors=0010",
    imgSrc: "/images/projects/maps.jpg",
    imgAlt: "MAPS API",
    description: "Map based on geo-location and Google maps API"
  },
  {
    name: "Dad Jokes API",
    link: "https://codepen.io/Mo3aZ/pen/JMjKEz",
    imgSrc: "/images/projects/dad-jokes.jpg",
    imgAlt: "Dad Jokes API",
    description: "Read some funny jokes with DadJokes API"
  },
  {
    name: "XKCD API",
    link: "https://codepen.io/Mo3aZ/pen/NXPMgY?editors=1010",
    imgSrc: "/images/projects/xkcd.jpg",
    imgAlt: "XKCD API",
    description: "Navigate through XKCD jokes or get therm randomly"
  }
];

exports.footerIcons = [
  {
    class: "fa fa-github media-icon",
    href: "https://github.com/Mo3az00"
  },
  {
    class: "fa fa-codepen media-icon",
    href: "https://codepen.io/Mo3aZ/"
  },
  {
    class: "fa fa-linkedin media-icon",
    href: "http://www.linkedin.com/in/mouaz-meda"
  },
  {
    class: "fa fa-xing media-icon",
    href: "http://www.xing.com/profile/Mouaz_Meda"
  }
];
