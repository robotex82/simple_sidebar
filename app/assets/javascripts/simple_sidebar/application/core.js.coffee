# Usage:
#
# Put all the content that is not in the sidebar in a container with the id #main-content a trigger button and add a sidebar.
#
#     <body>
#       <div id="main-content">
#         <button data-sidebar-trigger="#example-sidebar">
#           Toggle the example sidebar!  
#         </button>
#       </div>
#       <aside
#         id="example-sidebar"
#         data-sidebar-load="/de/backend/authentifizierung/user_sidebar.html"
#         data-sidebar-mode="overlay"
#         data-sidebar-position="right"
#         data-sidebar-size="20rem"
#         data-sidebar-state="closed">
#         <h3>Hello from the example sidebar!</h3>
#       </aside>
#     </body>
#
# Options:
#
#   load: Passing an url to load will load the content of the url via ajax and display it in the sidebar.
#   mode:
#     push: This will decrease the size of the main content, making room for the sidebar.
#     overlay: This will show the sidebar on top of the content, without moving it.
#     modal: Like overlay, but with a modal background.
#  position: left|right|top|bottom
#  size: size that the sidebar will take up (width for left and right, height for top and bottom). Pass any css size in px, rem or whatever you like.
#  state: open|closed
#
$ ->
  initializeSidebars = ->
    $('[data-sidebar-position]').each (_, e) ->
      # add css classes
      position = $(@).data('sidebar-position')
      mode = $(@).data('sidebar-mode')
      size = $(@).data('sidebar-size')
      state = $(@).data('sidebar-state')

      $(e).addClass("sidebar sidebar-#{position} sidebar-#{mode}")

      # set correct size
      if position in ['top', 'bottom']
        $(e).outerHeight(size)
      else
        $(e).outerWidth(size)

      # position outside of viewport
      outer_width = $(e).outerWidth()
      $(e).css(position, "-#{outer_width}px")

      # display it
      $(e).css("display", "inherit")

      # set initial state
      if state == 'open'
        openSidebar($(@), false)


  initializeModalBackground = ->
    $('body').on 'click', '#sidebar-modal-background', ->
      target = $("##{$(@).data('sidebar-target')}")
      closeSidebar(target)


  initializeTriggers = ->
    $('[data-sidebar-trigger]').on 'click', ->
      target = $($(@).data('sidebar-trigger'))
      state = target.data('sidebar-state')

      if state == 'closed'
        openSidebar(target, true)
      else
        closeSidebar(target, true)


  openSidebar = (target, animate = false) ->
    main_content = $('#main-content')

    position = target.data('sidebar-position')
    mode = target.data('sidebar-mode')
    size = target.data('sidebar-size')

    # Move sidebar into viewport
    if(animate == true)
      target.animate({ "#{position}": 0 }, 500);
    else
      target.css(position, 0)

    # Add margin equal to sidebar width/height to main content to make room
    # for the sidebar if in push mode
    if(mode == 'push')
      if(animate == true)
        main_content.animate({ "margin-#{position}": size }, 500)
      else
        main_content.css("margin-#{position}", size)

    # add modal if in modal mode
    if mode == 'modal'
      $("body").append("<div id=\"sidebar-modal-background\" data-sidebar-target=\"#{target.attr('id')}\"></div>")
      $('#sidebar-modal-background').fadeIn()

    # load content via ajax if the load option was given
    if target.data('sidebar-load')
      url = target.data('sidebar-load')
      $.ajax
        type: 'GET'
        url: url
        success: (response) ->
          $(target).html(response)
          return

    # set state
    target.data('sidebar-state', 'open')

  closeSidebar = (target, animate = false) ->
    main_content = $('#main-content')

    position = target.data('sidebar-position')
    mode = target.data('sidebar-mode')
    size_attribute = if position in ['top', 'bottom'] then 'height' else 'width'
    size = target.data('sidebar-size')
    
    # push
    if mode == 'push'
      if(animate == true)
        main_content.animate({ 'marginLeft': 0 }, 500);
      else
        main_content.css("margin-#{position}", '0px')

    # modal
    if mode == 'modal'
      $("#sidebar-modal-background").remove()

    if(animate == true)
     target.animate({ "#{position}": "-#{target.outerWidth()}px" }, 500);
    else
      target.css(position, "-#{target.outerWidth()}px")

    # set state
    target.data('sidebar-state', 'closed')

  initializeSidebars()
  initializeModalBackground()
  initializeTriggers()