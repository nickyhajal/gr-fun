class Api::V1::TestimonialController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /testimonials or /testimonials.json
  def index
    if params[:product_id] && params[:user_id]
      row = Testimonial.find_by(product_id: params[:product_id])
    elsif params[:id]
      row = Testimonial.find(params[:id])
    end

    render json: row
  end

  def upsert
    existing = false
    if params[:product_id] && params[:user_id]
      puts 1
      existing = Testimonial.find_by(product_id: params[:product_id])
    elsif params[:id]
      puts 2
      puts params[:id]
      existing = Testimonial.find(params[:id])
    end
    puts existing
    updates = testimonial_params.clone
    if existing
      updates.delete(:product_id)
      existing.update(updates)
      settings = Testimonial.find_by(product_id: params[:product_id])
    else
      settings = Testimonial.create({
        body: testimonial_params[:body],
        user_name: "#{Faker::Name.first_name} #{Faker::Name.last_name}",
        user_title: Faker::Job.title,
      })
    end
    render json: settings
  end

  def create
    row = Testimonial.create({
      body: testimonial_params[:body],
      user_name: "#{Faker::Name.first_name} #{Faker::Name.last_name}",
      user_title: Faker::Job.title,
      product_id: testimonial_params[:product_id],
      user_id: testimonial_params[:user_id],
    })
    render json: row
  end

  private

  # Only allow a list of trusted parameters through.
  def testimonial_params
    params.require(:testimonial).permit(:body, :user_name, :user_id, :product_id, :published, :id, :created_at, :updated_at, :user_title)
  end
end
