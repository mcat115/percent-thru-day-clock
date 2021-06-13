require "sinatra"
require "sinatra/json"
require "json"
require "sinatra/reloader" if development?
require "pry"
require "faraday"
require "dotenv/load"
require "csv"

set :bind, '0.0.0.0' 
set :public_folder, File.join(File.dirname(__FILE__), "public")
CURRENT_FILE_PATH = File.dirname(__FILE__)
# server config, taught to add these at my boot-camp


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

get "/past_searches" do
  past_searches = CSV.readlines("past_searches.csv", headers: true)

  status 200
  content_type :json

  json past_searches
end


post "/past_searches/new" do
  zip = request.body.rewind && request.body.read
  zip = "#{zip[8]}#{zip[9]}#{zip[10]}#{zip[11]}#{zip[12]}"
  # pulls the response from the fetch request and isolates the zip code

  if zip.length == 5
    CSV.open("past_searches.csv", "a") do |csv|
      csv.puts([zip])
    end
  end

  # parsed_response = JSON.parse(zip)

  # status 200
  # content_type :json

  # json parsed_response

end


# If the user tries to enter an unavailable path, this will route them to the available page
get "*" do
  erb :home
end
