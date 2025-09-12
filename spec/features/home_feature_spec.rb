require "rails_helper"

RSpec.describe "Home", type: :feature do
  let(:base_path) { "/" }

  describe "GET /" do
    before { visit(base_path) }
    
    it { expect(page).to have_content("Home") }

    describe "Sidebar 1", type: :js do
      it { expect(page).to have_content("This is sidebar 1") }

      describe "Closed State" do
        it { expect(page).to have_content("Closed State") }
      end
    end
  end
end
