# frozen_string_literal: true

module SimpleSidebar
  class Engine < ::Rails::Engine
    isolate_namespace SimpleSidebar

    initializer "simple_sidebar.importmap", before: "importmap" do |app|
      if defined?(Importmap)
        puts "[SimpleSidebar] Adding importmap paths"
        app.config.importmap.paths << root.join("config/importmap.rb")
        app.config.importmap.cache_sweepers << root.join("app/javascript")
      end
    end

    # Ensure asset server (Propshaft/Sprockets) can find JS files
    initializer "simple_sidebar.assets" do |app|
      app.config.assets.paths << root.join("app/javascript")
    end

#    # Automatically add importmap pins when the gem is loaded
#    initializer "simple_sidebar.importmap", before: "importmap" do |app|
#      if app.config.respond_to?(:importmap)
#        app.config.importmap.pin "simple_sidebar", to: "simple_sidebar/application.js"
#      end
#    end
#
#    # Ensure assets are precompiled
#    initializer "simple_sidebar.assets" do |app|
#      app.config.assets.precompile += %w[
#        simple_sidebar/application.js
#        simple_sidebar/application.css
#        simple_sidebar.css
#      ] if app.config.respond_to?(:assets)
#    end
  end
end