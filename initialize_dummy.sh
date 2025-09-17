#!/bin/bash

# Delete old dummy app
rm -rf spec/dummy

# Generate new dummy app
TEMP_DIR=$(mktemp -d)
cd $TEMP_DIR
rails new dummy \
  --skip-test \
  --skip-bundle \
  --skip-git \
  --asset-pipeline=propshaft \
  --javascript=importmap


# Go back to the original directory and copy the dummy app to the spec directory
cd - > /dev/null
cp -r $TEMP_DIR/dummy spec/

# Delete the temporary directory
rm -rf $TEMP_DIR

# Abort if spec/dummy was not created
if [ ! -d "spec/dummy" ]; then
  echo "Error: spec/dummy was not created"
  exit 1
fi

# Continue in the dummy app
cd spec/dummy

# Remove .ruby-version
rm .ruby-version

# Add gem to Gemfile
cat >> Gemfile << 'EOF'
gem "simple_sidebar", path: "../../../"
EOF

# Run bundle install
bundle install

# install importmaps
rails importmap:install
# rm config/initializers/assets.rb

# install turbo-rails
bin/rails turbo:install

# Setup example
rails generate controller Home index
mkdir -p app/views/home
cp ../setup/app/views/home/index.html.erb app/views/home/index.html.erb

# Add root to: "home#index" to config/routes.rb before end
sed -i '/^end$/i root to: "home#index"' config/routes.rb

# Install simple_sidebar
bin/rails g simple_sidebar:install
