source "https://rubygems.org"
ruby "2.2.3"

#
# Bundle edge Rails instead: gem "rails", github: "rails/rails"
gem "rails", "~>4.2"

# Note: We're using sqllite3 for development and testing
gem "pg"

gem "faker"

group :production do
  gem "rails_12factor" # Never include this for development or tests
  gem "puma"
end

# Use SCSS for stylesheets
gem "sass-rails"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier"
# Use CoffeeScript for .js.coffee assets and views
gem "coffee-rails"

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem "turbolinks"

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder"

# bundle exec rake doc:rails generates the API under doc/api.
gem "sdoc", group: :doc

# Use ActiveModel has_secure_password
# gem "bcrypt", "~> 3.1.7"

# Use Rails Html Sanitizer for HTML sanitization
gem "rails-html-sanitizer"

gem "react_on_rails"

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem "therubyracer"

gem "autoprefixer-rails"

gem "awesome_print"

gem 'stamp'
# jquery as the JavaScript library has been moved under /client and managed by npm.
# It is critical to not include any of the jquery gems when following this pattern or
# else you might have multiple jQuery versions.

group :development do
  # Access an IRB console on exceptions page and /console in development
  gem "web-console"
end

group :development, :test do
  ################################################################################
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-commands-rspec"

  ################################################################################
  # Manage application processes
  gem "foreman"
  gem "factory_girl_rails"

  ################################################################################
  # Linters and Security
  gem "rubocop", require: false
  gem "ruby-lint", require: false
  # Critical that require: false be set! https://github.com/brigade/scss-lint/issues/278
  gem "scss_lint", require: false
  gem "brakeman", require: false
  gem "bundler-audit", require: false

  ################################################################################
  # Favorite debugging gems
  gem "pry"
  gem "pry-doc"
  gem "pry-rails"
  gem "pry-stack_explorer"
  gem "pry-rescue"
  gem "pry-byebug"

  ################################################################################
  # Color console output
  gem "rainbow"
end

group :test  do
  gem "coveralls", require: false
  gem "rspec-rails"
  gem "rspec-retry"
  gem "capybara"
  gem "capybara-screenshot"
  gem "selenium-webdriver"
  gem "chromedriver-helper"
  gem "database_cleaner"
  gem "launchy"
end
