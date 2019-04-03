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
  
  s.required_ruby_version = '>= 2.5.0'

  s.add_dependency 'rails', '>= 5.0.0'
  s.add_dependency 'coffee-rails'
  s.add_dependency 'rao-view_helper', '>= 0.0.17.pre'

  s.add_development_dependency 'sqlite3', '~> 1.3.6'
  s.add_development_dependency 'guard-rspec'
  s.add_development_dependency 'rails-dummy'
  s.add_development_dependency 'rspec-rails'
end
