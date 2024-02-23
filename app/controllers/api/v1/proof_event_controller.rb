class Api::V1::ProofEventController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /proof_events or /proof_events.json
  def create_custom
    settings = ProofEventSetting.find_by(product_id: params[:product_id])

    # If this was real, we'd only have access to this with an API key
    # or if logged in
    if (settings.key != params[:key] && !params[:user_id])
      render status: :unauthorized, json: { error: "You are not authorized to access this resource. Verify that you are passing passing your token." }
    else
      body = params[:body]
      event = params[:event]
      product_id = params[:product_id]
      if params[:product_proof_event_id]
        proofEvent = ProductProofEvent.find(params[:product_proof_event_id])
        body = proofEvent.message
        product_id = proofEvent.product_id
        event = proofEvent.label.tr(" ", "-")
          .downcase
      end
      @proof_event = ProofEvent.log({
        "kind": "custom",
        "event": event,
        "product_id": product_id,
        "value": params[:value],
        # "username": params[:username],
        # "location": params[:location],
        # "image": params[:image],
        "username": "#{Faker::Name.first_name} #{Faker::Name.last_name[0]}.",
        "image": "https://i.pravatar.cc/64?u=",
        "location": "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
        "body": body,
        "event_at": DateTime.now,
      })
      render json: @proof_event
    end
  end
end
