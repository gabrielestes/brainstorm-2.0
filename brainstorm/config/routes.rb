Rails.application.routes.draw do

  root to: 'users#index'

  post 'users/create' => 'users#create'

  post 'login' => 'users#login'

  get '/users/logout' => 'users#logout'

  get '/users/:id' => 'users#show', as: 'user_show'

  get 'games/leaderboard' => 'games#show'

  get 'games/play' => 'games#new'

  post 'games/create' => 'games#create'

  get 'users/edit'

  patch 'users/update'

  delete 'users/destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
