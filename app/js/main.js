// When the user scrolls the page, execute stickyNavFunc 
window.onscroll = function() {stickyNavFunc()};

// Get the header
var header = document.getElementById("wt-header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyNavFunc() {
  if (window.pageYOffset > sticky) {
    header.classList.add("hasScrolled");
  } else {
    header.classList.remove("hasScrolled");
  }
}

$(document).on('ready', function() {
  $('.mobile-menu-btn').on('click', function(){
    if($(this).hasClass('isOpen')) {
      $(this).removeClass('isOpen');
      $('header').removeClass('mobile-active');
    }else {
      $(this).addClass('isOpen');
      $('header').addClass('mobile-active');
    }
  });
  $('.slider-client-logos').slick({
    autoplay: true,
    infinite: true,
    arrows: false,
    // variableWidth: true,
    autoplaySpeed: 5000,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [      
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  // Platform Tour Interactivity slider---
  $('.slider-platform-interactivity').slick({
    // autoplay: true,
    infinite: false,
    arrows: true,
    // autoplaySpeed: 5000,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow:$('.interactivity-slide-next-button'),
    prevArrow:$('.interactivity-slide-prev-button'),
    responsive: [      
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });
  $('.slider-platform-interactivity .slick-slide').on('click touch', function() {
    var selfIndex = $(this).data('slickIndex');
    $(this).siblings('.slick-slide').find('.slide-platform-interactivity').removeClass('selected');
    $(this).find('.slide-platform-interactivity').addClass('selected');
    //select item details---
    $('.platform-interactivity .interactivity-item-detail').each(function(){
      var slideDataIndex = $(this).data('index');
      if (slideDataIndex === selfIndex) {
        $(this).addClass('visible');
      } else {
        $(this).removeClass('visible');
      }
    });
  });
  //init---
  $('.slider-platform-interactivity .slick-slide:first-child').click();

  // Sit back slider---
  $('.slider-sitback_interact').slick({
    infinite: false,
    arrows: true,
    nextArrow:$('.slide-next-button'),
    prevArrow:$('.slide-prev-button'),
  });

  // Platform scroll to section---
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
});