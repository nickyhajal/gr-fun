class Api::V1::ProductProofEventsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    events = ProductProofEvent.where(product_id: params[:product_id])
    render json: events
  end

  def upsert
    permitted_events = params.permit(events: [:id, :product_id, :message, :label, :valueLabel, :created_at, :updated_at])[:events]
    permitted_events.each do |event|
      if event[:id]
        existing = ProductProofEvent.find(event[:id])
        existing.update(event)
      else
        settings = ProductProofEvent.create(event)
      end
    end
    render json: { status: "ok" }
  end
end

def product_proof_event_params
  params.require(:product_proof_event).permit(:message, :label, :valueLabel, :id, :created_at, :updated_at)
end
