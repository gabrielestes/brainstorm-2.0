Rails.application.routes.draw do

  root to: 'users#index'
  get 'games/leaderboard'

  get 'users/index'

  get 'users/create'

  get 'users/show'

  get 'users/edit'

  get 'users/update'

  get 'users/destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
