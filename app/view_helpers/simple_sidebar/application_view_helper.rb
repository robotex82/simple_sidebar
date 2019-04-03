module SimpleSidebar
  class ApplicationViewHelper < Rao::ViewHelper::Base
    def render_sidebar(name, options = {}, &block)
      options.reverse_merge!(
        load: nil,
        mode: :overlay,
        position: :left,
        size: '25rem',
        state: :closed
      )
      c.render partial: '/simple_sidebar/application_view_helper/render_sidebar', locals: { name: name, options: options, block: block }
    end
  end
end