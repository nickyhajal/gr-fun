class CreateProofEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :proof_events do |t|
      t.string :kind
      t.string :body
      t.string :image
      t.string :username
      t.string :value
      t.string :product_id
      t.string :event
      t.string :event_at

      t.timestamps
    end
  end
end
