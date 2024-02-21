Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "proof_events", to: "proof_events#index"
      post "proof_events/create", to: "proof_events#create"
      post "proof_events/create_demo", to: "proof_events#create_demo"
    end
  end
  get "/*path" => "homepage#index"
  root "homepage#index"
end
