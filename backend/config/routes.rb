Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get '/issues/:id/upvote', to: 'issues#upvote', as: 'upvote_issue'
      get '/issues/:id/downvote', to: 'issues#downvote', as: 'downvote_issue'
      resources :categories
      resources :comments
      resources :issues
    end
  end
end
