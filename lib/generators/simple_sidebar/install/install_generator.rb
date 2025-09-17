module SimpleSidebar
  module Generators
    class InstallGenerator < Rails::Generators::Base
      # Add view helper to application controller
      def add_view_helper
        inject_into_class "app/controllers/application_controller.rb", "ApplicationController", "  view_helper SimpleSidebar::ApplicationViewHelper, as: :simple_sidebar_helper\n"
      end

      # Add importmap pin
      def add_importmap_pin
        append_to_file "config/importmap.rb", "pin \"simple_sidebar\", to: \"simple_sidebar/application.js\"\n"
      end

      # Add simple_sidebar import to application.js
      def add_import_to_application_js
        append_to_file "app/javascript/application.js", "import \"simple_sidebar\"\n"
      end
    end
  end
end
