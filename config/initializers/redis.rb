require "redis"
redis = Redis.new

class RedisConnection
  def self.instance
    @redis ||= Redis.new
  end
end
