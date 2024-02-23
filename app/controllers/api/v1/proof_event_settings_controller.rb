class Api::V1::ProofEventSettingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /proof_events or /proof_events.json
  def index
    settings = ProofEventSetting.find_by(product_id: params[:product_id])

    # Key would be removed unless logged in user has permission
    # and we are specifically requesting it to be included
    settings_hash = settings.attributes
    settings_hash.delete("key") unless params[:secure]

    render json: settings_hash
  end

  # GET /proof_events/1/edit
  def edit
  end

  def generate_key
    existing = ProofEventSetting.find_by(product_id: params[:product_id])
    settings = {}
    if existing
      key = p "gr_" + SecureRandom.urlsafe_base64
      existing.update({ key: key })
      settings = ProofEventSetting.find_by(product_id: params[:product_id])
    end
    render json: settings
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
