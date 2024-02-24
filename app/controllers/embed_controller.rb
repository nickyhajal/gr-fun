class EmbedController < ApplicationController
  skip_before_action :verify_authenticity_token

  def testimonial
    @t = Testimonial.find(params[:id])
    render layout: false
  end
end
