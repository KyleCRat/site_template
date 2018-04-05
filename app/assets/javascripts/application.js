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
//= require jquery.remotipart

//= require foundation
//= require turbolinks

//= require jquery.slick
//= require js.cookie
//= require maskedinput
//= require sitebindings

// Require Other JS Libraries
// require countUp
//= require nested_form_fields

// Require GSAP animation libraries
//= require 'greensock/plugins/CSSPlugin'
//= require 'greensock/plugins/ScrollToPlugin'
//= require 'greensock/jquery.gsap.js'
//= require 'greensock/easing/EasePack'
//= require 'greensock/TweenLite'
//= require 'greensock/TimelineLite'
// require 'greensock/TweenMax'
// require 'greensock/TimelineMax'

// get the rest of the js tree
//= require_tree .

const success = [
 'background: green',
 'color: white',
 'display: block',
 'padding: 4px 36px',
 'min-width: 400px',
 'text-align: center'
].join(';');

const failure = [
 'background: red',
 'color: white',
 'display: block',
 'padding: 4px 36px',
 'min-width: 400px',
 'text-align: center'
].join(';');


if (SiteBindings.logging) console.log('Site Loaded at: '+ new Date().getTime());

///////////////////////////////////////////////////
// Global Watchers
///////////////////////////////////////////////////

// When closing a foundation reveal if it was an Ajax modal destroy it
$(document).on('closed.zf.reveal', function() {
  // Destroy the foundation instance then remove any closed ajax reveals
  // $('.ajax-reveal').foundation('destroy').remove();
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

// Try to initalize as long as async javascript is ready
function tryInit() {
    if (SiteBindings.logging) console.log('application.js - tryInit()');

    if (typeof $ == 'function' && typeof SiteBindings == 'object' && (typeof DOMContentLoaded != 'undefined' && DOMContentLoaded === true)) {

        if (SiteBindings.logging) console.info('%c Page Ready', success);
        // Reset the load error count for next page load
        SiteBindings.loadErrorCount = 0;
        // If site is propoerly set up, initialize all javascript needed for site
        initalize();
        // And then add the event listener for turbolink page navigation
        addTurbolinksLoadListener();

    } else {
        // Log the approporiate error that has caused the js to not load
        if (SiteBindings.logging) console.info('%c Page Not Ready', failure);
        if (SiteBindings.logging && typeof $ != 'function') console.error('jQuery NOT LOADING');
        if (SiteBindings.logging && typeof SiteBindings != 'object') console.error('SiteBindings NOT INITALIZED');
        if (SiteBindings.logging && typeof DOMContentLoaded == 'undefined') console.error('DOMContentLoaded NOT SET');
        if (SiteBindings.logging && DOMContentLoaded !== true) console.error('DOMContentLoaded NOT TRUE');

        if (SiteBindings.loadErrorCount > 20) {
            // If The page has failed to load 20 times, reload the page after a 5 second pause
            if (SiteBindings.logging) console.info('%c Page has failed to load 20 times - Reloading in 5 seconds', failure);
            window.setTimeout(function(){
                window.location.reload(false);
            }, 5000);

        } else {

            // Otherwise wait 50ms, add 1 to the loadErrorCount and try again
            SiteBindings.loadErrorCount += 1;
            window.setTimeout(function(){
                if (SiteBindings.logging) console.warn('trying to reinitalize via tryInit()');
                tryInit();
            }, 50);
        }
    }
}

// Fire the inital tryInit function after 50ms to allow for DOMContentLoaded
window.setTimeout(function(){
    tryInit();
}, 50);
