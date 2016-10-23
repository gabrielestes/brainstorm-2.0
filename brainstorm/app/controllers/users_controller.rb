class UsersController < ApplicationController
  before_action :signed_in?, only: [:show]
  def index
    @user = User.new
  end

  # def new
  #   @user = User.new
  # end

  def create
    p params
    @user = User.new(name: params[:'player-name-reg'], email: params[:email])
    @user.password = params[:password]
    @user.password_confirmation = params[:password_confirmation]
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_show_path(:id => @user.id), notice: "Thank you for signing up!"
    else
      redirect_to root_path
    end
  end

  def login
    p User.find_by(name: params[:'player-name-login'])
    @user = User.find_by(name: params[:'player-name-login'])
    if @user && @user.authenticate(params[:'player-password-login'])
      p "SUCCESSFULZ"
      session[:user_id] = @user.id
      redirect_to user_show_path(:id => @user.id)
    else
      p "FAILSFULL"
      flash[:notice] = "Username or password is invalid."
      redirect_to root_path
    end
  end

  def show
    @user = User.find(session[:user_id])
  end

  def logout
    p "Tryin to log out!"
    session[:user_id] = nil
    flash[:notice] = "You have successfully logged out."
    redirect_to root_path
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
