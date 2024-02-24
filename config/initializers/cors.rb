Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*"
    resource "/embed/testimonial/:id", :headers => :any, :methods => [:get, :options]
  end
end
