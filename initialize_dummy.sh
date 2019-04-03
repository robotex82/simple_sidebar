#!/bin/bash
# Delete old dummy app
rm -rf spec/dummy

# Generate new dummy app
DISABLE_MIGRATE=true rake dummy:app
rm spec/dummy/.ruby-version

# Satisfy prerequisites
cd spec/dummy
# RAILS_ENV=development rails g model User email
# sed -i '17irequire "bootstrap4-kaminari-views"' config/application.rb


# Add ActiveStorage
# rails active_storage:install

# I18n configuration
# touch config/initializers/i18n.rb
# echo "Rails.application.config.i18n.available_locales = [:en, :de]" >> config/initializers/i18n.rb
# echo "Rails.application.config.i18n.default_locale    = :de" >> config/initializers/i18n.rb

# I18n routing
# touch config/initializers/route_translator.rb
# echo "RouteTranslator.config do |config|" >> config/initializers/route_translator.rb
# echo "  config.force_locale = true" >> config/initializers/route_translator.rb
# echo "end" >> config/initializers/route_translator.rb

# Prerequisites
sed -i '8i\    <script crossorigin="anonymous" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>', app/views/layouts/application.html.erb

# Install
sed -i '15i//= require simple_sidebar' app/assets/javascripts/application.js
sed -i '13i\ *= require simple_sidebar' app/assets/stylesheets/application.css
sed -i '14i\ *= require simple_sidebar/default_theme' app/assets/stylesheets/application.css
sed -i '2i\  view_helper SimpleSidebar::ApplicationViewHelper, as: :simple_sidebar_helper' app/controllers/application_controller.rb
# rails generate $INSTALL_NAME:install
# rails $GEM_NAME:install:migrations db:migrate db:test:prepare

# Setup specs
rails generate controller Home index

cat > app/views/home/index.html.erb <<EOL
<button data-sidebar-trigger="#sidebar1">Sidebar 1</button>
<button data-sidebar-trigger="#sidebar2">Sidebar 2</button>
<button data-sidebar-trigger="#sidebar3">Sidebar 3</button>
<button data-sidebar-trigger="#sidebar4">Sidebar 4</button>
<%= simple_sidebar(self).render_sidebar(:sidebar1) do %>
  <h3>This is sidebar 1</h3>
<% end %>
<%= simple_sidebar_helper(self).render_sidebar(:sidebar2) do %>
  <h3>This is sidebar 2</h3>
<% end %>
<%= simple_sidebar_helper(self).render_sidebar(:sidebar3) do %>
  <h3>This is sidebar 3</h3>
<% end %>
<%= simple_sidebar_helper(self).render_sidebar(:sidebar4) do %>
  <h3>This is sidebar 4</h3>
<% end %>
EOL
