class Api::V1::ProofEventsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_proof_event, only: %i[ show edit update destroy ]

  # GET /proof_events or /proof_events.json
  def index
    events = ProofEvent.fetchForProduct(params[:product_id])
    render json: events
  end

  # GET /proof_events/1 or /proof_events/1.json
  def show
  end

  # GET /proof_events/new
  def new
    @proof_event = ProofEvent.new
  end

  # GET /proof_events/1/edit
  def edit
  end

  # POST /proof_events or /proof_events.json
  def create
    @proof_event = ProofEvent.log(proof_event_params)
    render json: @proof_event
  end

  def create_demo
    date = DateTime.now
    @proof_event = ProofEvent.log({
      "kind": "message",
      "event": "purchase",
      "product_id": 1,
      "username": "#{Faker::Name.first_name} #{Faker::Name.last_name[0]}.",
      "location": "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
      "image": "https://i.pravatar.cc/200?u=",
      "body": "%user% purchased %product%",
      "created_at": date, "updated_at": date, "event_at": date,
    })
    render json: @proof_event
  end

  # PATCH/PUT /proof_events/1 or /proof_events/1.json
  def update
  end

  # DELETE /proof_events/1 or /proof_events/1.json
  def destroy
  end

  private

  def set_proof_event
    @proof_event = ProofEvent.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def proof_event_params
    params.require(:proof_event).permit(:type, :message, :image, :username, :product_id, :event, :event_at)
  end
end
