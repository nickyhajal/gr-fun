class CreateProductProofEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :product_proof_events do |t|
      t.integer :product_id
      t.string :label
      t.string :valueLabel
      t.string :message

      t.timestamps
    end
  end
end
