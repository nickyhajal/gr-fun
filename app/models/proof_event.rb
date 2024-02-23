class ProofEvent < ApplicationRecord
  validates :body, presence: true
  validates :username, presence: true
  validates :kind, presence: true
  validates :event, presence: true

  MAX_LIST_LENGTH = 20

  def self.redis
    RedisConnection.instance
  end

  def self.log(eventData)

    # Create new event
    event = ProofEvent.create(eventData)
    settings = ProofEventSetting.find_by(product_id: event.product_id)
    key = self.keyForProduct(event.product_id)

    # Create or update cache
    cache = self.redis.get(key)
    events = JSON.parse(cache) if cache
    if events.kind_of?(Array)
      if (events.length >= MAX_LIST_LENGTH)
        events.pop
      end
    else
      events = []
    end
    events.prepend(event.as_json)
    self.redis.set(key, events.to_json)

    # Broadcast new event
    if settings.hide_names
      event["username"] = ""
    end
    ActionCable.server.broadcast(
      "proofevents_#{event.product_id}",
      event
    )
    event
  end

  def self.keyForProduct(productId)
    "proofevents_#{productId}"
  end
  def self.fetchForProduct(productId)
    settings = ProofEventSetting.find_by(product_id: productId)
    key = self.keyForProduct(productId)
    cache = self.redis.get(key)
    events = JSON.parse(cache) if cache
    if !events
      events = ProofEvent.where(product_id: productId).order(event_at: :desc).limit(MAX_LIST_LENGTH)
      self.redis.set(key, events.to_json)
    else
    end
    if settings.hide_names
      events = events.map do |event|
        event["username"] = ""
        event
      end
    end
    events
  end
end
