# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
p "Start data seed..."
date = 300.minutes.ago
20.times do |i|
  id = i + 1
  ProofEvent.create({
    "kind": "message",
    "event": "purchase",
    "product_id": 1,
    "username": "#{Faker::Name.first_name} #{Faker::Name.last_name[0]}.",
    "location": "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
    "image": "https://i.pravatar.cc/60?u=#{i}",
    "body": "%user% purchased %product%",
    "created_at": date, "updated_at": date, "event_at": date,
  })
  date = date + rand(4...30).minutes
end

p "DB Seeded"
