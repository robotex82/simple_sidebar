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
#         id="example-sidebar">
#         data-sidebar-load="/de/backend/authentifizierung/user_sidebar.html"
#         data-sidebar-mode="overlay"
#         data-sidebar-position="right"
#         data-sidebar-size="20rem"
#         data-sidebar-state="closed"
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
#
$ ->
  $('body').on 'click', '#sidebar-modal-background', ->
    target = $("##{$(@).data('sidebar-target')}")
    closeModal(target)

  $('[data-sidebar-position]').each (_, e) ->
    position = $(@).data('sidebar-position')
    $(e).addClass("sidebar sidebar-#{position}")
    if $(@).data('sidebar-state') == 'opened'
      openModal($(@))

  $('[data-sidebar-trigger]').on 'click', ->
    target = $($(@).data('sidebar-trigger'))
    state = target.data('sidebar-state')
    
    if state == 'closed'
      openModal(target)
    else
      closeModal(target)

openModal = (target) ->
  main_content = $('#main-content')

  position = target.data('sidebar-position')
  mode = target.data('sidebar-mode')
  size_attribute = if position in ['top', 'bottom'] then 'height' else 'width'
  size = target.data('sidebar-size')

  target.css("display", "inherit")
  target.css(size_attribute, size)
  main_content.css("margin-#{position}", size) if mode == 'push'


  # modal
  if mode == 'modal'
    $("body").append("<div id=\"sidebar-modal-background\" data-sidebar-target=\"#{target.attr('id')}\"></div>")

  # load
  if target.data('sidebar-load')
    url = target.data('sidebar-load')
    $.ajax
      type: 'GET'
      url: url
      success: (response) ->
        $(target).html(response)
        return

  # set state
  target.data('sidebar-state', 'opened')

closeModal = (target) ->
  main_content = $('#main-content')

  position = target.data('sidebar-position')
  mode = target.data('sidebar-mode')
  size_attribute = if position in ['top', 'bottom'] then 'height' else 'width'
  size = target.data('sidebar-size')
  
  # push
  if mode == 'push'
    main_content.css("margin-#{position}", size)

  # modal
  if mode == 'modal'
    $("#sidebar-modal-background").remove()

  target.css(size_attribute, '0px')

  if mode == 'push'
    main_content.css("margin-#{position}", '0px')

  # set state
  target.data('sidebar-state', 'closed')