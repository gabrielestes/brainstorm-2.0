class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  skip_before_filter :verify_authenticity_token

  def signed_in?
    unless session[:user_id] && User.find(session[:user_id])
      flash[:notice] = "Please log in to proceed."
      redirect_to root_path
    end
  end
end
