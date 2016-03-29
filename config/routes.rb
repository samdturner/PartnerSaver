Rails.application.routes.draw do
  root "pages#tasks"
  get '/partners', to: 'pages#tasks'

  namespace :api do
    resources :tasks, only: [:index, :create, :update, :destroy]
    resources :partners, only: [:index, :create, :update, :destroy]
  end
end
