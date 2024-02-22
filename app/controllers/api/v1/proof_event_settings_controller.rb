class Api::V1::ProofEventSettingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /proof_events or /proof_events.json
  def index
    settings = ProofEventSetting.find_by(product_id: params[:product_id])
    render json: settings
  end

  # GET /proof_events/1/edit
  def edit
  end

  def upsert
    existing = ProofEventSetting.find_by(product_id: params[:product_id])
    updates = proof_event_settings_params.clone
    if existing
      updates.delete(:product_id)
      puts updates
      existing.update(updates)
      settings = ProofEventSetting.find_by(product_id: params[:product_id])
    else
      settings = ProofEventSetting.create(proof_event_settings_params)
    end
    render json: settings
  end

  private

  # Only allow a list of trusted parameters through.
  def proof_event_settings_params
    params.require(:proof_event_setting).permit(:hide_names, :show_on_checkout, :product_id, :id, :created_at, :updated_at)
  end
end
