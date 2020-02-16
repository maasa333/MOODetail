Rails.application.routes.draw do
  get 'prompts/index'
  get 'prompts/show'
  resources :moods
  resources :prompts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
