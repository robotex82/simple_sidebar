module SimpleSidebar
  # Usage:
  #
  #     # app/controllers/application_controller.rb
  #     class ApplicationController < AcitonController::Base
  #       view_helper SimpleSidebar::ApplicationViewHelper, as: :simple_sidebar_helper
  #     end
  #
  class ApplicationViewHelper < Rao::ViewHelper::Base
    # Usage
    #
    # Adding a sidebar:
    #
    #
    # This will add a sidebar on the left in push mode and add some custom html to the
    # sidebar container:
    #
    #     <div id="main-content">
    #       <button data-sidebar-trigger="#sidebar1">Sidebar 1</button>
    #     </div>
    #
    #     <%= simple_sidebar_helper(self).render_sidebar(:sidebar1, position: :left, mode: :push, container_html: { style: 'padding: 20px; overflow: scroll;'}) do %>
    #       <h3>This is sidebar 1</h3>
    #       <button data-sidebar-trigger="#sidebar1">Close me</button>
    #     <% end %>
    #
    # This will add a sidebar to the right in default mode (overlay):
    #
    #     <div id="main-content">
    #       <button data-sidebar-trigger="#sidebar2">Sidebar 2</button>
    #     </div>
    #     <%= simple_sidebar_helper(self).render_sidebar(:sidebar2, position: :right) do %>
    #       <h3>This is sidebar 2</h3>
    #       <button data-sidebar-trigger="#sidebar2">Close me</button>
    #     <% end %>
    # 
    # This will add a sidebar to the top, loading custom content into the sidebar via ajax:
    # 
    #     <div id="main-content">
    #       <button data-sidebar-trigger="#sidebar3">Sidebar 3</button>
    #     </div>
    #     <%= simple_sidebar_helper(self).render_sidebar(:sidebar3, position: :top, load: '/current_user_profile') do %>
    #       <h3>This is sidebar 3</h3>
    #       <button data-sidebar-trigger="#sidebar3">Close me</button>
    #     <% end %>
    # 
    # If you want to load content from external urls you will have to add the correct policies to the cors settings.
    # 
    # This will render a sidebar to the bottom in modal mode:
    # 
    #     <div id="main-content">
    #       <button data-sidebar-trigger="#sidebar4">Sidebar 4</button>
    #     </div>
    #     <%= simple_sidebar_helper(self).render_sidebar(:sidebar4, position: :bottom, mode: :modal) do %>
    #       <h3>This is sidebar 4</h3>
    #       <button data-sidebar-trigger="#sidebar4">Close me</button>
    #     <% end %>
    #
    def render_sidebar(name, options = {}, &block)
      options.reverse_merge!(
        load: nil,
        mode: :overlay,
        position: :left,
        size: '25rem',
        state: :closed,
        container_html: {}
      )
      c.render partial: '/simple_sidebar/application_view_helper/render_sidebar', locals: { name: name, options: options, block: block }
    end
  end
end