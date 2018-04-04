// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery-ui
//= require jquery_ujs
// require jquery.remotipart

//= require foundation
//= require turbolinks

// Require Client Side Form Validations
//= require rails.validations
//= require rails.validations.simple_form

//= require jquery.slick
//= require js.cookie
//= require maskedinput
//= require sitebindings

// Require Other JS Libraries
// require countUp

// Require GSAP animation libraries
//= require 'greensock/plugins/CSSPlugin'
//= require 'greensock/jquery.gsap.js'
//= require 'greensock/easing/EasePack'
//= require 'greensock/TweenLite'
//= require 'greensock/TimelineLite'
// require 'greensock/TweenMax'
// require 'greensock/TimelineMax'

// Include froala wysiwyg
// require froala_editor.min.js

// Include other plugins for froala
// require plugins/align.min.js
// require plugins/char_counter.min.js
// require plugins/code_beautifier.min.js
// require plugins/code_view.min.js
// require plugins/colors.min.js
// require plugins/draggable.min.js
// require plugins/entities.min.js
// require plugins/file.min.js
// require plugins/font_family.min.js
// require plugins/font_size.min.js
// require plugins/fullscreen.min.js
// require plugins/image.min.js
// require plugins/image_manager.min.js
// require plugins/inline_style.min.js
// require plugins/line_breaker.min.js
// require plugins/link.min.js
// require plugins/lists.min.js
// require plugins/paragraph_format.min.js
// require plugins/paragraph_style.min.js
// require plugins/quick_insert.min.js
// require plugins/quote.min.js
// require plugins/save.min.js
// require plugins/table.min.js
// require plugins/url.min.js
// require plugins/video.min.js

// get the rest of the js tree
//= require_tree .

if (SiteBindings.logging) console.log('Site Loaded at: '+ new Date().getTime());

///////////////////////////////////////////////////
// Global Watchers
///////////////////////////////////////////////////

// When closing a foundation reveal if it was an Ajax modal destroy it
$(document).on('closed.zf.reveal', function() {
  // Destroy the foundation instance then remove any closed ajax reveals
  $('.ajax-reveal').foundation('destroy').remove();
});

///////////////////////////////////////////////////
// Initalize all window variable arrays
///////////////////////////////////////////////////
// Set how many times the scroll is checked per second for animation triggers
window.scrollFPS = 20;

// Set how many fps the paralax function runs at
//  NOTE: this does not affect the fps of the animation, just how many
//        times a second the code will check for page movement
window.paralaxFPS = 60;
// Time in seconds of how long the transform takes to complete when a scroll
//    is detected
window.paralaxAnimationSpeed = 0.05;


///////////////////////////////////////////////////
// Initalize all javascript for the site once
//   jQuery and SiteBindings have been confirmed
//   to be loaded - This allows your application.js
//   to safely load asynchronously
///////////////////////////////////////////////////
function initalize() {

  if (SiteBindings.logging) console.log('initalize -> Fired');

  // Initalize The Scroll Checking Function on first
  //   load of the site
  if (SiteBindings.isLoading) {
    SiteBindings.isLoading = false;
    SiteBindings.scrollCheck();
  }

  fireJsInitialized();

  $(function(){ $(document).foundation(); });

  SiteBindings.scrollFunctions();
  SiteBindings.pageSpecificJS();
  SiteBindings.pageSlickSliders();

  // SiteBindings.contentEditable();
  // SiteBindings.refreshOnResize();
  // SiteBindings.smoothAnchor();
  // SiteBindings.datepicker();
}

function fireJsInitialized() {
  if (SiteBindings.logging) console.log('js:initalized fired');
  var event = document.createEvent('Event');
  event.initEvent('js:initalized', true, true); //can bubble, and is cancellable
  document.dispatchEvent(event);
}

// Initalize on page load
var addTurbolinksLoadListener = (function() {
  var executed = false;

  return function () {
    if (!executed) {
      executed = true;
      if (SiteBindings.logging) console.log('addTurbolinksLoadListener -> Event Listener Loaded');

      document.addEventListener("turbolinks:load", function() {
        if (SiteBindings.logging) console.log('tryInit -> Page Load Fired');

        SiteBindings.session.pagesVisited += 1;

        tryInit();
      });
    }
  };
})();

tryInit();

// Try to initalize as long as async javascript is ready
function tryInit() {
  if (SiteBindings.logging) console.log('tryInit -> Fired');
  if (SiteBindings.logging) console.log('tryinit -> inside');

  if (typeof $ == 'function' && typeof SiteBindings == 'object' && (typeof DOMContentLoaded != 'undefined' && DOMContentLoaded === true)) {

    if (SiteBindings.logging) console.log('tryinit -> jQuery, DOMContentLoaded and SiteBindings Initalized');
    // If jqeury is loaded and sitebindings defined fire initalize
    initalize();
    addTurbolinksLoadListener();

  } else {

    //Otherwise wait 10ms and try again
    if (SiteBindings.logging) console.warn('tryinit -> else: Rquirements not loaded yet');
    window.setTimeout(function(){
      if (SiteBindings.logging) console.log('tryinit -> else -> tryInit()');
      tryInit();
    }, 10);
  }
}
