# frozen_string_literal: true

$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "simple_sidebar/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "simple_sidebar"
  s.version     = SimpleSidebar::VERSION
  s.authors     = ["Roberto Vasquez Angel"]
  s.email       = ["roberto@vasquez-angel.de"]
  s.summary     = "Simple sidebar."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
end
