class CreateTestimonialSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :testimonial_settings do |t|
      t.string :title
      t.string :body
      t.integer :product_id
      t.boolean :show_testimonials

      t.timestamps
    end
  end
end
