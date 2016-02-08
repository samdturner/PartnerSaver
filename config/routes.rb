Rails.application.routes.draw do
  root "pages#tasks"

  namespace :api do
    resources :tasks, only: [:index, :create, :update, :destroy]
  end
end
