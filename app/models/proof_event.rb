require "redis"

redis = Redis.new

class ProofEvent < ApplicationRecord
  validates :body, presence: true
  validates :username, presence: true
  validates :kind, presence: true
  validates :event, presence: true

  MAX_LIST_LENGTH = 20

  def self.log(eventData)

    # Create new event
    event = ProofEvent.create(eventData)
    key = "proofevents_#{event.product_id}"

    # Create or update cache
    cache = redis.get(key)
    events = JSON.parse(cache) if cache
    if events.kind_of?(Array)
      if (events.length >= self.MAX_LIST_LENGTH)
        events.pop
      end
    else
      events = []
    end
    events.prepend(event)
    redis.set(key, events)

    # Broadcast new event
    ActionCable.server.broadcast(
      "proofevents_#{event.product_id}",
      event
    )
    event
  end
  def self.fetchForProduct(productId)
    cache = redis.get(key)
    events = JSON.parse(cache) if cache
    if !events
      events = ProofEvent.where(product_id: params[:product_id]).order(event_at: :desc).limit(self.MAX_LIST_LENGTH)
    end
    events
  end
end
