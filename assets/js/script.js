// Define relative speeds of parallax items
var velocitySplash = 0.4;
var velocityOverlay = 0.7;
var velocityBackground = 0.2;
var numberOfSplashImages = 8;

// Useful properties to store and refer to (avoid hardcoding these values in .js)
var fixedNavHeight = $('nav.fixed-nav').height();
var topNavOffset = $('nav.top-nav').height();

// Random number used for selecting a splash image to display
var randomNumber =  Math.floor(Math.random() * numberOfSplashImages + 1);

// Initialize arrays containing data for splash image (must be in same order
// as images are named in the splash folder)
var splashAlt = [
  'queensferry crossing',
  'king\'s college circle',
  'johnson lake',
  'royal observatory london',
  'university avenue toronto',
  'tower bridge london',
  'lakeside toronto',
  'waterfront seattle'
];
var splashCap = [
  'Queensferry Crossing<br>Scotland, 2015',
  'King\'s College Circle<br>Toronto, 2015',
  'Johnson Lake<br>Alberta, 2015',
  'Royal Observatory Greenwich<br>London, 2015',
  'University Avenue<br>Toronto, 2015',
  'Tower Bridge<br>London, 2015',
  'Lakeside<br>Toronto, 2016',
  'Waterfront<br>Seattle, 2016'
];

// Initially hide the fixed navigation bar out of the screen
$('nav.fixed-nav').css('top', '-' + fixedNavHeight + 'px');

// Functions to execute repetitively when the document is ready
$(document).ready(function() {
  
  // Load random cover image in splash box and print to HTML
  $(function () {
    document.getElementById('front-splash-box').innerHTML = '';
    var splashImgHtml = '';
    splashImgHtml += '<img class="splash-img" src="assets/img/splash/cover-' + randomNumber + '.jpg" alt="' + splashAlt[randomNumber-1]+ '" width="1200" height="377"/>';
    splashImgHtml += '<h3 class="overlay-cap">' + splashCap[randomNumber-1] + '</h3>';
    $('#front-splash-box').append(splashImgHtml);
  });
  
  // Slow scrolling to id location when anchors are clicked
  $('nav a, .feature h2 a').click(function(){
    if ($("html, body").is(":animated")) {
      return;
    }
    $('html, body').animate({
      scrollTop: $( $(this).attr('href') ).offset().top - fixedNavHeight
    }, 800, 'swing', function () {
      $('nav.fixed-nav').css('top', '0');
      $('nav.fixed-nav').css('background-position', '0 0');
    });
  });
  
  // Define fixed navigation bar movements relative to scrolling
  $(function () {
    var currentPos = $(window).scrollTop();
    $(document).on('scroll', function() {
      if ($("nav.fixed-nav").is(":animated")) {
        return;
      }
      var pos = $(window).scrollTop();
      if (pos > topNavOffset + 100 && pos > currentPos + 10) {
        $('nav.fixed-nav').css('top', '0');
        $('nav.fixed-nav').css('background-position', '0 0');
      }
      else if (pos <= topNavOffset + 100 || pos < currentPos - 30) {
        $('nav.fixed-nav').css('top', '-' + fixedNavHeight + 'px');
        $('nav.fixed-nav').css('background-position', '0 ' + '-' + fixedNavHeight + 'px');
      }
      currentPos = pos;
    });
  });
  
  // Define parallax behaviour for splash images and textures
  $(function () {
    $(document).on('scroll', function () {
      var pos = $(window).scrollTop();
      var height = $('#front-splash-box .splash-img').height();
      $('#front-splash-box').css('height', (height - pos * velocitySplash) + 'px');
      $('#front-splash-overlay').css('background-position', '0 ' + ((-pos) * velocityOverlay) + 'px');
      $('#front-splash').css('filter', 'blur(' + (pos * 0.01) + 'px) brightness('+ (1 - pos * 0.0015) + ')');
      $('.feature').css('background-position', '0 ' + ((pos) * velocityBackground) + 'px');
    });
    $(window).on('resize', function () {
      $('#front-splash-box').css('height', $('#front-splash-box .splash-img').height() + 'px'); // Clean up after setting height previously
    });
  });
});
