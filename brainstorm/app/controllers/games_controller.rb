class GamesController < ApplicationController
  before_action :signed_in?, only: [:show]

  def new

  end

  def create
    # @game = Game
    p params
    @games = Game.all
    @personal_best = Game.find_by
    @personal_best = @personal_best.score.max
    @game = Game.new(score: params[:score], user_id: session[:user_id])
    @game.save
    flash[:notice] = "Thanks for playing!"
    redirect_to user_show_path(:id => session[:user_id])
    # @user = User.new(name: params[:'player-name-reg'], email: params[:email])
    # @user.password = params[:password]
    # @user.password_confirmation = params[:password_confirmation]
    # if @user.save
    #   session[:user_id] = @user.id
    #   redirect_to user_show_path(:id => @user.id), notice: "Thank you for signing up!"
    # else
    #   redirect_to root_path
    # end
  end

  def show
    @top_five = Game.order(score: :desc).first(5)
  end


end
