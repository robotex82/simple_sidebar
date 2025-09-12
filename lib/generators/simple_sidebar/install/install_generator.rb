module SimpleSidebar
  module Generators
    class InstallGenerator < Rails::Generators::Base
      # Add view helper to application controller
      def add_view_helper
        inject_into_class "app/controllers/application_controller.rb", "ApplicationController", "  view_helper SimpleSidebar::ApplicationViewHelper, as: :simple_sidebar_helper\n"
      end

      # Add importmap pin
      def add_importmap_pin
        inject_into_file "config/importmap.rb", "pin \"simple_sidebar\", to: \"simple_sidebar/application.js\"\n", before: "// Importmap configuration for SimpleSidebar gem"
      end
    end
  end
end
