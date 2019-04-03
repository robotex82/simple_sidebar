# SimpleSidebar

## Usage

Put all the content that is not in the sidebar in a container with the id #main-content a trigger button and add a sidebar.

    <body>
      <div id="main-content">
        <button data-sidebar-trigger="#example-sidebar">
          Toggle the example sidebar!  
        </button>
      </div>
      <aside
        id="example-sidebar">
        data-sidebar-load="/de/backend/authentifizierung/user_sidebar.html"
        data-sidebar-mode="overlay"
        data-sidebar-position="right"
        data-sidebar-size="20rem"
        data-sidebar-state="closed"
        <h3>Hello from the example sidebar!</h3>
      </aside>
    </body>

## Options

* load: Passing an url to load will load the content of the url via ajax and display it in the sidebar.
* mode:
  * push: This will decrease the size of the main content, making room for the sidebar.
  * overlay: This will show the sidebar on top of the content, without moving it.
  * modal: Like overlay, but with a modal background.
* position: left|right|top|bottom
* size: size that the sidebar will take up (width for left and right, height for top and bottom). Pass any css size in px, rem or whatever you like.

## License

This project rocks and uses MIT-LICENSE.