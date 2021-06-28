require "sinatra"
require "sinatra/json"
require "json"
require "sinatra/reloader" if development?
require "pry" if development? || test?
require "faraday"
require "dotenv/load"

set :bind, '0.0.0.0' 
set :public_folder, File.join(File.dirname(__FILE__), "public")

OPEN_WEATHER_API_KEY = ENV['OPEN_WEATHER_API_KEY']
GOOGLE_CLOUD_MAP_API_KEY = ENV['GOOGLE_CLOUD_MAP_API_KEY']

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

get "/api/v1/map" do
  zip = params[:zip]
  url = "https://maps.googleapis.com/maps/api/staticmap?center=#{zip}&size=400x400&key=#{GOOGLE_CLOUD_MAP_API_KEY}"

  api_response = Faraday.get(url)
  parsed_response = api_response.body

  status 200
  content_type :png
 
  parsed_response
end

get "/past_searches" do
  past_searches = File.readlines("past_searches.txt", headers: true)

  status 200
  content_type :json

  json past_searches
end

post "/past_searches/new" do
  zip = request.body.rewind && request.body.read
  zip = "#{zip[8]}#{zip[9]}#{zip[10]}#{zip[11]}#{zip[12]}"
  #I was confused on getting the zip to save in params, so I did this instead

  if zip.length == 5 && zip.to_i > 0 && zip.to_i.is_a?(Numeric)
    File.open("past_searches.txt", "a") do |file|
      file.puts([zip])
    end
  end

end

get "*" do
  erb :home
end
