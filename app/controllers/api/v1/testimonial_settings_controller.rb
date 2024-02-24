class Api::V1::TestimonialSettingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /testimonials or /testimonials.json
  def index
    settings = TestimonialSetting.find_by(product_id: params[:product_id])

    render json: settings
  end

  def upsert
    existing = TestimonialSetting.find_by(product_id: params[:product_id])
    updates = testimonial_settings_params.clone
    if existing
      updates.delete(:product_id)
      existing.update(updates)
      settings = TestimonialSetting.find_by(product_id: params[:product_id])
    else
      settings = TestimonialSetting.create({
        product_id: params[:product_id],
        body: "What have been your favorite parts of %product% since you purchased? What have you received the most value from?",
        title: "Share a Testimonial",
        show_testimonials: true,
      })
    end
    render json: settings
  end

  private

  # Only allow a list of trusted parameters through.
  def testimonial_settings_params
    params.require(:testimonial_setting).permit(:body, :product_id, :title, :show_testimonials, :id, :created_at, :updated_at)
  end
end
