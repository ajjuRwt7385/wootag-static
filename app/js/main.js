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
// utils- hostname---
var host = window.location.hostname === 'localhost' ? 'wtstaging.wootag.com' : window.location.hostname;
var domain = `https://${host}`;
function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}
//---
$(document).on('ready', function() {
  // Responsive mobile navigation toggle---
  $('.mobile-menu-btn').on('click', function(){
    if($(this).hasClass('isOpen')) {
      $(this).removeClass('isOpen');
      $('header').removeClass('mobile-active');
    }else {
      $(this).addClass('isOpen');
      $('header').addClass('mobile-active');
    }
  });
  // Logo slider for home and explore page---
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
    ]
  });
  // Platform Tour Interactivity slider---
  $('.slider-platform-interactivity').slick({
    infinite: false,
    arrows: true,
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
  //init platform slider---
  $('.slider-platform-interactivity .slick-slide:first-child').click();
  //------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------

  // Sit back slider---
  $('.slider-sitback_interact').slick({
    infinite: false,
    arrows: true,
    nextArrow:$('.slide-next-button'),
    prevArrow:$('.slide-prev-button'),
  });

  // Platform smooth scroll to section from footer links---
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

  // Explore page videos fetch---
  var currentPage = $('body').data('page');
  console.log('currentPage', currentPage);
  switch(currentPage) {
    case 'explore': {
      // fetch video items---
      $.ajax({url: domain+"/api/videos?category=", success: function(result){
        var items = result.items;
        console.log('items', items);
        items.forEach((item, idx) => {
          
          if($('#explore_video_items').length) {
            var hostName = item.wootag_url && extractHostname(item.wootag_url);
            var videoUrl = hostName && '//'+hostName+'/embed/'+item.playback_id;
            $('#explore_video_items').append('<div class="col-sm-12 col-md-6 video_item"><a href="#" data-href="'+videoUrl+'" data-type="overlay-iframe"><div class="img"><img src="'+item.img+'" alt="'+item.title+'" /><div class="overlay"><div class="button-circular"><i class="material-icons">play_arrow</i></div><div class="detail"><div class="title">'+item.title+'</div><div class="category">'+item.category+'</div></div></div></div></a></div>');
            // $('#explore_video_items').append('<div class="col-sm-12 col-md-6 video_item"><div class="iframe-responsive"><iframe src="'+videoUrl+'" width="100%" height="480"></iframe></div></div>');
          }
        });        
        // item click event to show iframe video in overlay---
        $('.video_item a').on('click', function(e){
          e.preventDefault();
          var videoUrl = $(this).data('href');
          showOverlay({ type: 'iframe', href: videoUrl });
        });
      }});
      
      break;
    }
    case 'home' : {
      $('a.go-beyond-views-link').on('click', function(e){
        e.preventDefault();
        var videoUrl = $(this).data('href');
        showOverlay({ type: 'iframe', href: videoUrl });
      });
      break;
    }
    default: {
      return;
    }
  }
  // closing overlay event for all pages--
  function showOverlay(data) {
    var type = data && data.type;
    if(type === 'iframe') {      
      var videoUrl = data.href;
      $('.overlay-lightbox iframe').attr('src', videoUrl+'?autoplay=1');
      $('.overlay-lightbox').addClass('visible');
      $('body').addClass('no-scroll');
    }
  }
  function closeOverlay() {
    $('.overlay-lightbox iframe').attr('src', '');
    $('.overlay-lightbox').removeClass('visible');
    $('body').removeClass('no-scroll');
  }
  $('.overlay-lightbox .button-close').on('click', function(e) {
    e.preventDefault();
    closeOverlay();
  });
  // key events--
  $(document).keyup(function(e) {
    if (e.key === "Escape") { // escape key maps to keycode `27`
      if($('.overlay-lightbox').length && $('.overlay-lightbox').hasClass('visible')) {
        closeOverlay();
      }
    }
  });
});
