class GamesController < ApplicationController
  before_action :signed_in?, only: [:show]

  def new
    user_games = Game.where(user_id: session[:user_id])
    @personal_best = user_games.order(:score).last.score
    @high_score = Game.order(:score).last.score
    p @personal_best
  end

  def create
    p params

    @games = Game.all
    @game = Game.new(score: params[:score], user_id: session[:user_id])
    @game.save
    flash[:notice] = "Thanks for playing!"
    redirect_to user_show_path(:id => session[:user_id])
    p "HIGH SCORE IS #{@high_score}"
  end

  def show
    @top_five = Game.order(score: :desc).first(5)
  end


end
