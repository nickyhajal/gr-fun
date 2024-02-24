class CreateTestimonials < ActiveRecord::Migration[7.1]
  def change
    create_table :testimonials do |t|
      t.string :user_name
      t.string :user_title
      t.integer :user_id
      t.integer :product_id
      t.string :body
      t.boolean :published

      t.timestamps
    end
  end
end
