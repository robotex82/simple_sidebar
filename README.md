# SimpleSidebar

A modern, lightweight sidebar component for Rails 8+ applications using Propshaft and importmaps. Built with vanilla JavaScript (no jQuery dependency).

## Prerequisites

- Rails 8.0+
- Propshaft (default in Rails 8)
- Importmaps (default in Rails 8)

## Installation

Add it to your gemfile:

    # Gemfile
    gem 'simple_sidebar'

Bundle:

    > bundle install

Add the JavaScript to your application:

    # app/javascript/application.js
    import "simple_sidebar"

Add the CSS to your application:

    # app/assets/stylesheets/application.css
    @import "simple_sidebar";

Add the view helper to your application:

    # app/controllers/application_controller.rb
    class ApplicationController < ActionController::Base
      view_helper SimpleSidebar::ApplicationViewHelper, as: :simple_sidebar_helper
    end

## Usage

Adding a sidebar:

This will add a sidebar on the left in push mode and add some custom html to the
sidebar container:

    <div id="main-content">
      <button data-sidebar-trigger="#sidebar1">Sidebar 1</button>
    </div>

    <%= simple_sidebar_helper(self).render_sidebar(:sidebar1, position: :left, mode: :push, container_html: { style: 'padding: 20px; overflow: scroll;'}) do %>
      <h3>This is sidebar 1</h3>
      <button data-sidebar-trigger="#sidebar1">Close me</button>
    <% end %>

This will add a sidebar to the right in default mode (overlay):

    <div id="main-content">
      <button data-sidebar-trigger="#sidebar2">Sidebar 2</button>
    </div>
    <%= simple_sidebar_helper(self).render_sidebar(:sidebar2, position: :right) do %>
      <h3>This is sidebar 2</h3>
      <button data-sidebar-trigger="#sidebar2">Close me</button>
    <% end %>

This will add a sidebar to the top, loading custom content into the sidebar via ajax:

    <div id="main-content">
      <button data-sidebar-trigger="#sidebar3">Sidebar 3</button>
    </div>
    <%= simple_sidebar_helper(self).render_sidebar(:sidebar3, position: :top, load: '/current_user_profile') do %>
      <h3>This is sidebar 3</h3>
      <button data-sidebar-trigger="#sidebar3">Close me</button>
    <% end %>

If you want to load content from external urls you will have to add the correct policies to the cors settings.

This will render a sidebar to the bottom in modal mode:

    <div id="main-content">
      <button data-sidebar-trigger="#sidebar4">Sidebar 4</button>
    </div>
    <%= simple_sidebar_helper(self).render_sidebar(:sidebar4, position: :bottom, mode: :modal) do %>
      <h3>This is sidebar 4</h3>
      <button data-sidebar-trigger="#sidebar4">Close me</button>
    <% end %>

## Usage with pure HTML

Put all the content that is not in the sidebar in a container with the id #main-content a trigger button and add a sidebar.

    <body>
      <div id="main-content">
        <button data-sidebar-trigger="#example-sidebar">
          Toggle the example sidebar!  
        </button>
      </div>
      <aside
        id="example-sidebar"
        data-sidebar-load="/de/backend/authentifizierung/user_sidebar.html"
        data-sidebar-mode="overlay"
        data-sidebar-position="right"
        data-sidebar-size="20rem"
        data-sidebar-state="closed">
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
* state: open|closed

## Features

- **Modern JavaScript**: Built with vanilla JavaScript, no jQuery dependency
- **Smooth Animations**: CSS transitions and requestAnimationFrame for smooth sidebar animations
- **Multiple Modes**: Support for push, overlay, and modal sidebar modes
- **Flexible Positioning**: Sidebars can be positioned on left, right, top, or bottom
- **AJAX Loading**: Dynamic content loading via fetch API
- **Rails 8 Compatible**: Works seamlessly with Propshaft and importmaps

## License

This project rocks and uses MIT-LICENSE.