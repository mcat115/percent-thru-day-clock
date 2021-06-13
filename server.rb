require "sinatra"
require "sinatra/json"
require "json"
require "sinatra/reloader" if development?
require "pry"
require "faraday"
require "dotenv/load"

set :bind, '0.0.0.0'  # bind to all interfaces
set :public_folder, File.join(File.dirname(__FILE__), "public")
CURRENT_FILE_PATH = File.dirname(__FILE__)
# was taught to add these to sinatra apps in my boot-camp

OPEN_WEATHER_API_KEY = ENV['OPEN_WEATHER_API_KEY']

get "/" do
  erb :home
end

get "/api/v1/forecast" do
  zip = params[:zip]
  url = "http://api.openweathermap.org/data/2.5/weather?zip=#{zip},us&appid=#{OPEN_WEATHER_API_KEY}"
  api_response = Faraday.get(url)
  parsed_response = JSON.parse(api_response.body)

  status 200
  content_type :json

  json parsed_response
end



# get "/past_searches" do
#   past_searches = CSV.readlines("past_searches.csv", headers: true)

#   binding.pry

#   # parsed_response = JSON.parse(past_searches)

#   status 200
#   content_type :json

#   # json parsed_response
#   json past_searches
# end


# post "/past_searches/new" do
#   item = params["Name"]
#   quantity = params["Quantity"]

#   if item.length > 0
#     CSV.open("grocery_list.csv", "a") do |csv|
#       csv.puts([item, quantity])
#    end

# end


# If the user tries to enter an unavailable path, this will route them to the available page
get "*" do
  erb :home
end
