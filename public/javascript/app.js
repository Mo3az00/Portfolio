import "./bootstrap";

// ProgressBar animation

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on("load scroll", function() {
  $(".progress").each(function() {
    if ($(this).isInViewport()) {
      var bar = $(this).find(".progress-bar");
      bar.css("width", bar.attr("aria-valuenow") + "%");
      bar.addClass("progress-animate");
    }
  });
});

// change the color of the navbar while scrolling
$(function() {
  $(window).scroll(function() {
    let my = $("#my");
    let navbar = $(".navbar");
    if ($(window).scrollTop() >= my.height() - navbar.height()) {
      navbar.addClass("scrolled");
    } else {
      navbar.removeClass("scrolled");
    }
  });
});

// buttons scrolls smoothly

$(".link-my-brand").click(function() {
  $("html,body").animate(
    {
      scrollTop: $("#my").offset().top
    },
    1000
  );
});

$(".btn-myStyle").click(function() {
  $("html,body").animate(
    {
      scrollTop: $("#contact").offset().top
    },
    1000
  );
});

$(".project-img, .btn-myStyle , .btn-contact").hover(function() {
  $(this).toggleClass("hoverIt");
});

// Get the height of the navbar
const navbarHeight = $(".navbar").outerHeight();

// Smooth Scrolling for links and positioning
const $root = $("html, body");

$('a[href^="#"]').click(function(e) {
  e.preventDefault();

  let href = $.attr(this, "href");
  const newPosition = $(href).offset().top - navbarHeight;

  if (history.pushState) {
    history.pushState(null, null, href);
  }

  $root.animate(
    {
      scrollTop: newPosition
    },
    1000,
    function() {
      if (!history.pushState) {
        location.hash = `/${href}`;
      }
    }
  );

  return false;
});

// Scroll spy (change class active while scrolling)
const scrollspy = document.querySelector("#nav-main");

if (scrollspy) {
  $("body").scrollspy({
    target: "#nav-main",
    offset: navbarHeight + 15
  });

  $('[data-spy="scroll"]').on("activate.bs.scrollspy", function() {
    $("nav-link").addClass("active");
  });
}

// navbar scrolls smoothly (old way)

// $(function() {
//   $(".navbar-dark li a").click(function(e) {
//     // $('body').css('paddingTop', $('.navbar-my').innerHeight());

//     e.preventDefault();
//     $("html, body").animate(
//       {
//         scrollTop: $("#" + $(this).data("scroll")).offset().top
//       },
//       1000
//     );
//   });
// });
