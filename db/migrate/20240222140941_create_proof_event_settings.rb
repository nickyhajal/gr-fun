class CreateProofEventSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :proof_event_settings do |t|
      t.integer :product_id
      t.boolean :show_on_checkout
      t.boolean :hide_names
      t.string :key

      t.timestamps
    end
  end
end
