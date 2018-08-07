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

// navbar scrolls smoothly

$(function() {
  $(".navbar-dark li a").click(function(e) {
    // $('body').css('paddingTop', $('.navbar-my').innerHeight());

    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $("#" + $(this).data("scroll")).offset().top
      },
      1000
    );
  });
  // class active handling old way
  // $(".navbar-dark li ").click(function() {
  //   $(".navbar-dark li ").removeClass("active");
  //   $(this).addClass("active");
  //   // $(this).addClass('active').parent().siblings().find('a').removeClass('active')
  // });
});

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

$(".project-img, .btn-myStyle , .btn-contact").hover(function() {
  $(this).toggleClass("hoverIt");
});

// const scrollspy = document.querySelector("#nav-main");

// if (scrollspy) {
//   $("body").scrollspy({
//     target: ".nav-main",
//     offset: navbarHeight + 11
//   });

//   $('[data-spy="scroll"]').on("activate.bs.scrollspy", function() {
//     $("nav-link").addClass("active");
//   });
// }
