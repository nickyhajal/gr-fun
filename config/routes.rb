Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "proof_events", to: "proof_events#index"
      post "proof_events/create_demo", to: "proof_events#create_demo"
      post "proof_event/create", to: "proof_event#create_custom"

      get "proof_event_settings", to: "proof_event_settings#index"
      post "proof_event_settings/generate_key", to: "proof_event_settings#generate_key"
      post "proof_event_settings/upsert", to: "proof_event_settings#upsert"

      get "product_proof_events", to: "product_proof_events#index"
      post "product_proof_events/upsert", to: "product_proof_events#upsert"

      # get "testimonials", to: "testimonials#index"
      # post "testimonial/upsert", to: "testomonial#upsert"
    end
  end
  get "/*path" => "homepage#index"
  root "homepage#index"
end

# get "proof_event", to: "proof_event#index"
# post "proof_events/create", to: "proof_events#create"
# post "product_proof_event", to: "proof_event_settings#generate_key"
