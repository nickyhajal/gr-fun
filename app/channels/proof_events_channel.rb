class ProofEventsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "proofevents_#{params[:product_id]}"
  end

  def unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast "proof_events", data
  end
end
