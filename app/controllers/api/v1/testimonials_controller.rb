class Api::V1::TestimonialsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /testimonials or /testimonials.json
  def index
    rows = []
    if params[:product_id]
      rows = Testimonial.where(product_id: params[:product_id])
    end
    render json: rows
  end

  private

  # Only allow a list of trusted parameters through.
  def testimonial_params
    params.require(:testimonial).permit(:body, :user_name, :user_id, :product_id, :published, :id, :created_at, :updated_at)
  end
end
