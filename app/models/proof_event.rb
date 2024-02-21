class ProofEvent < ApplicationRecord
  validates :body, presence: true
  validates :username, presence: true
  validates :kind, presence: true
  validates :event, presence: true

  def self.log(eventData)
    event = ProofEvent.create(eventData)
    ActionCable.server.broadcast(
      "proofevents_#{event.product_id}",
      event
    )
    event
  end
end
