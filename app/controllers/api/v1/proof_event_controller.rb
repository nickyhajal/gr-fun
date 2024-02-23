class Api::V1::ProofEventController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /proof_events or /proof_events.json
  def create_custom
    settings = ProofEventSetting.find_by(product_id: params[:product_id])
    if (settings.key != params[:key])
      render status: :unauthorized, json: { error: "You are not authorized to access this resource. Verify that you are passing passing your token." }
    else
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
  end
end
