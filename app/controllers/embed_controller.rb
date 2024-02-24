class EmbedController < ApplicationController
  skip_before_action :verify_authenticity_token
  after_action :allow_iframe, only: :testimonial

  def testimonial
    @t = Testimonial.find(params[:id])
    render layout: false
  end

  private

  def allow_iframe
    response.headers.except! "X-Frame-Options"
  end
end
