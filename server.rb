require "sinatra"
require "sinatra/json"
require "json"
require "sinatra/reloader" if development?
require "pry" if development? || test?

set :bind, '0.0.0.0' 
set :public_folder, File.join(File.dirname(__FILE__), "public")

get "/" do
  erb :home
end

get "*" do
  erb :home
end
