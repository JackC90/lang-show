Rails.application.routes.draw do
  resources :languages

  resources :articles do
    collection do
      get :extract
    end
  end

  resources :tasks do
    resources :items
  end

  resources :words do
    resources :sentences
  end

  resources :task_articles
  
  # standard devise routes available at /users
  # NOTE: make sure this comes first!!!
  devise_for :users

  # token auth routes available at /api/v1/auth
  namespace :api do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
