class Api::V1::ProofEventController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /proof_events or /proof_events.json
  def index
    render json: { "hey": "htere" }
  end

  def create_custom
    puts params[:body]
    # puts ">>>>>>>>>>>>>>>>>>> hy #{params[:product_id]}"
    @proof_event = ProofEvent.log({
      "kind": "custom",
      "event": params[:event],
      "product_id": params[:product_id],
      # "username": params[:username],
      # "location": params[:location],
      # "image": params[:image],
      "username": "#{Faker::Name.first_name} #{Faker::Name.last_name[0]}.",
      "image": "https://i.pravatar.cc/64?u=",
      "location": "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
      "body": params[:body],
      "event_at": DateTime.now,
    })
    render json: @proof_event
  end

  def set_proof_event
    @proof_event = ProofEvent.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
end
