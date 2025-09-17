require "rails_helper"

RSpec.describe "Home", type: :feature do
  let(:base_path) { "/" }

  describe "GET /" do
    before { visit(base_path) }
    
    it { expect(page).to have_content("Home") }

    describe "Sidebar Left", js: true do
      it { expect(page).not_to have_content("This is sidebar Left") }

      describe "Opening" do
        it { expect { click_button("Sidebar Left") }.to change { page.has_content?("This is sidebar Left") }.from(false).to(true) }
      end

      describe "Closing" do
        let(:close_button) { within("#sidebar1") { find("button") } }
        before { click_button("Sidebar Left") }
        
        it { expect { close_button.click; sleep(1) }.to change { page.has_content?("This is sidebar Left") }.from(true).to(false) }
      end
    end

    describe "Sidebar Right", js: true do
      it { expect(page).not_to have_content("This is sidebar Right") }

      describe "Opening" do
        it { expect { click_button("Sidebar Right") }.to change { page.has_content?("This is sidebar Right") }.from(false).to(true) }
      end

      describe "Closing" do
        let(:close_button) { within("#sidebar2") { find("button") } }
        before { click_button("Sidebar Right") }
        
        it { expect { close_button.click; sleep(1) }.to change { page.has_content?("This is sidebar Right") }.from(true).to(false) }
      end
    end

    describe "Sidebar Top", js: true do
      it { expect(page).not_to have_content("This is sidebar Top") }

      describe "Opening" do
        it { expect { click_button("Sidebar Top") }.to change { page.has_content?("This is sidebar Top") }.from(false).to(true) }
      end

      describe "Closing" do
        let(:close_button) { within("#sidebar3") { find("button") } }
        before { click_button("Sidebar Top") }
        
        it { expect { close_button.click; sleep(1) }.to change { page.has_content?("This is sidebar Top") }.from(true).to(false) }
      end
    end

    describe "Sidebar Bottom", js: true do
      it { expect(page).not_to have_content("This is sidebar Bottom") }

      describe "Opening" do
        it { expect { click_button("Sidebar Bottom") }.to change { page.has_content?("This is sidebar Bottom") }.from(false).to(true) }
      end

      describe "Closing" do
        let(:close_button) { within("#sidebar4") { find("button") } }
        before { click_button("Sidebar Bottom") }
        
        it { expect { close_button.click; sleep(1) }.to change { page.has_content?("This is sidebar Bottom") }.from(true).to(false) }
      end
    end
  end
end
