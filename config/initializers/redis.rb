require "redis"

class RedisConnection
  def self.instance
    redisUrl = ENV["REDIS_URL"] || "redis://localhost:6379"
    @redis ||= Redis.new(url: redisUrl)
  end
end
