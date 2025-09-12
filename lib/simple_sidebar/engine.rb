# frozen_string_literal: true

module SimpleSidebar
  class Engine < ::Rails::Engine
    # Automatically add importmap pins when the gem is loaded
    initializer "simple_sidebar.importmap", before: "importmap" do |app|
      if app.config.respond_to?(:importmap)
        app.config.importmap.pin "simple_sidebar", to: "simple_sidebar/application.js"
      end
    end
  end
end