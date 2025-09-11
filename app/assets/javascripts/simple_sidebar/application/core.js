// Usage:
//
// Put all the content that is not in the sidebar in a container with the id #main-content a trigger button and add a sidebar.
//
//     <body>
//       <div id="main-content">
//         <button data-sidebar-trigger="#example-sidebar">
//           Toggle the example sidebar!  
//         </button>
//       </div>
//       <aside
//         id="example-sidebar"
//         data-sidebar-load="/de/backend/authentifizierung/user_sidebar.html"
//         data-sidebar-mode="overlay"
//         data-sidebar-position="right"
//         data-sidebar-size="20rem"
//         data-sidebar-state="closed">
//         <h3>Hello from the example sidebar!</h3>
//       </aside>
//     </body>
//
// Options:
//
//   load: Passing an url to load will load the content of the url via ajax and display it in the sidebar.
//   mode:
//     push: This will decrease the size of the main content, making room for the sidebar.
//     overlay: This will show the sidebar on top of the content, without moving it.
//     modal: Like overlay, but with a modal background.
//  position: left|right|top|bottom
//  size: size that the sidebar will take up (width for left and right, height for top and bottom). Pass any css size in px, rem or whatever you like.
//  state: open|closed
//
$(document).ready(function() {
  function initializeSidebars() {
    $('[data-sidebar-position]').each(function(index, element) {
      // add css classes
      var position = $(this).data('sidebar-position');
      var mode = $(this).data('sidebar-mode');
      var size = $(this).data('sidebar-size');
      var state = $(this).data('sidebar-state');

      $(element).addClass("sidebar sidebar-" + position + " sidebar-" + mode);

      // set correct size
      if (['top', 'bottom'].indexOf(position) !== -1) {
        $(element).outerHeight(size);
      } else {
        $(element).outerWidth(size);
      }

      // position outside of viewport
      var outerWidth = $(element).outerWidth();
      $(element).css(position, "-" + outerWidth + "px");

      // display it
      $(element).css("display", "inherit");

      // set initial state
      if (state === 'open') {
        openSidebar($(this), false);
      }
    });
  }

  function initializeModalBackground() {
    $('body').on('click', '#sidebar-modal-background', function() {
      var target = $("#" + $(this).data('sidebar-target'));
      closeSidebar(target);
    });
  }

  function initializeTriggers() {
    $('[data-sidebar-trigger]').on('click', function() {
      var target = $($(this).data('sidebar-trigger'));
      var state = target.data('sidebar-state');

      if (state === 'closed') {
        openSidebar(target, true);
      } else {
        closeSidebar(target, true);
      }
    });
  }

  function openSidebar(target, animate) {
    animate = animate || false;
    var mainContent = $('#main-content');

    var position = target.data('sidebar-position');
    var mode = target.data('sidebar-mode');
    var size = target.data('sidebar-size');

    // Move sidebar into viewport
    if (animate === true) {
      var animateObj = {};
      animateObj[position] = 0;
      target.animate(animateObj, 500);
    } else {
      target.css(position, 0);
    }

    // Add margin equal to sidebar width/height to main content to make room
    // for the sidebar if in push mode
    if (mode === 'push') {
      if (animate === true) {
        var marginAnimateObj = {};
        marginAnimateObj["margin-" + position] = size;
        mainContent.animate(marginAnimateObj, 500);
      } else {
        mainContent.css("margin-" + position, size);
      }
    }

    // add modal if in modal mode
    if (mode === 'modal') {
      $("body").append("<div id=\"sidebar-modal-background\" data-sidebar-target=\"" + target.attr('id') + "\"></div>");
      $('#sidebar-modal-background').fadeIn();
    }

    // load content via ajax if the load option was given
    if (target.data('sidebar-load')) {
      var url = target.data('sidebar-load');
      $.ajax({
        type: 'GET',
        url: url,
        success: function(response) {
          target.html(response);
        }
      });
    }

    // set state
    target.data('sidebar-state', 'open');
  }

  function closeSidebar(target, animate) {
    animate = animate || false;
    var mainContent = $('#main-content');

    var position = target.data('sidebar-position');
    var mode = target.data('sidebar-mode');
    var sizeAttribute = (['top', 'bottom'].indexOf(position) !== -1) ? 'height' : 'width';
    var size = target.data('sidebar-size');
    
    // push
    if (mode === 'push') {
      if (animate === true) {
        mainContent.animate({ 'marginLeft': 0 }, 500);
      } else {
        mainContent.css("margin-" + position, '0px');
      }
    }

    // modal
    if (mode === 'modal') {
      $("#sidebar-modal-background").remove();
    }

    if (animate === true) {
      var closeAnimateObj = {};
      closeAnimateObj[position] = "-" + target.outerWidth() + "px";
      target.animate(closeAnimateObj, 500);
    } else {
      target.css(position, "-" + target.outerWidth() + "px");
    }

    // set state
    target.data('sidebar-state', 'closed');
  }

  initializeSidebars();
  initializeModalBackground();
  initializeTriggers();
});
