Rails.application.routes.draw do

  # Authentication via Divise routes
  devise_for :users, :controllers => { registrations: 'registrations' }

  # Home Page
  root 'pages#home'

  get 'contact',
    to: 'pages#contact',
    as: :contact

  get 'sitemap',
    to: 'pages#site_map',
    as: :site_map


  resources :ajax_modal

  # Custom Error Routes
  match "/404", :to => "errors#not_found", :via => :all
  match "/500", :to => "errors#internal_server_error", :via => :all
end
