#!/bin/bash

# Delete old dummy app
rm -rf spec/dummy

# Generate new dummy app
DISABLE_MIGRATE=true rake dummy:app
rm spec/dummy/.ruby-version

cd spec/dummy

# Satisfy prerequisites
sed -i '8i\    <script crossorigin="anonymous" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>' app/views/layouts/application.html.erb

# Install
sed -i '15i//= require simple_sidebar' app/assets/javascripts/application.js
sed -i '13i\ *= require simple_sidebar' app/assets/stylesheets/application.css
sed -i '14i\ *= require simple_sidebar/default_theme' app/assets/stylesheets/application.css
sed -i '2i\  view_helper SimpleSidebar::ApplicationViewHelper, as: :simple_sidebar_helper' app/controllers/application_controller.rb

# Setup example
rails generate controller Home index
cat > app/views/home/index.html.erb <<EOL
<div id="main-content">
  <button data-sidebar-trigger="#sidebar1">Sidebar 1</button>
  <button data-sidebar-trigger="#sidebar2">Sidebar 2</button>
  <button data-sidebar-trigger="#sidebar3">Sidebar 3</button>
  <button data-sidebar-trigger="#sidebar4">Sidebar 4</button>
</div>
<%= simple_sidebar_helper(self).render_sidebar(:sidebar1, position: :left, mode: :push, container_html: { style: 'padding: 20px; overflow: scroll;'}) do %>
  <h3>This is sidebar 1</h3>
  <button data-sidebar-trigger="#sidebar1">Close me</button>
<% end %>
<%= simple_sidebar_helper(self).render_sidebar(:sidebar2, position: :right) do %>
  <h3>This is sidebar 2</h3>
  <button data-sidebar-trigger="#sidebar2">Close me</button>
<% end %>
<%= simple_sidebar_helper(self).render_sidebar(:sidebar3, position: :top) do %>
  <h3>This is sidebar 3</h3>
  <button data-sidebar-trigger="#sidebar3">Close me</button>
<% end %>
<%= simple_sidebar_helper(self).render_sidebar(:sidebar4, position: :bottom, mode: :modal) do %>
  <h3>This is sidebar 4</h3>
  <button data-sidebar-trigger="#sidebar4">Close me</button>
<% end %>
EOL
