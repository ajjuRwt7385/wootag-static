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
  $('.slider-client-logos').slick({
    autoplay: true,
    infinite: true,
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
});