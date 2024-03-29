# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_02_23_144516) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "product_proof_events", force: :cascade do |t|
    t.integer "product_id"
    t.string "label"
    t.string "valueLabel"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "proof_event_settings", force: :cascade do |t|
    t.integer "product_id"
    t.boolean "show_on_checkout"
    t.boolean "hide_names"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "key"
  end

  create_table "proof_events", force: :cascade do |t|
    t.string "kind"
    t.string "body"
    t.string "image"
    t.string "username"
    t.string "location"
    t.string "product_id"
    t.string "event"
    t.string "event_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "value"
  end

  create_table "testimonial_settings", force: :cascade do |t|
    t.string "title"
    t.string "body"
    t.integer "product_id"
    t.boolean "show_testimonials"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "testimonials", force: :cascade do |t|
    t.string "user_name"
    t.string "user_title"
    t.integer "user_id"
    t.integer "product_id"
    t.string "body"
    t.boolean "published"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
