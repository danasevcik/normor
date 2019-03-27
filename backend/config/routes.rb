Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :conversations, only: [:index, :create]
  resources :messages, only: [:create, :index]
  mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      get '/issues/:id/upvoteissue', to: 'issues#upvote', as: 'upvote_issue'
      get '/issues/:id/downvoteissue', to: 'issues#downvote', as: 'downvote_issue'
      get '/comments/:id/upvotecomment', to: 'comments#upvote', as: 'upvote_comment'
      get '/comments/:id/downvotecomment', to: 'comments#downvote', as: 'downvote_comment'
      resources :categories
      resources :comments
      resources :issues
    end
  end
end
