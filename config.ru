require './app'
require './api'

map '/' do
  run ClassRanker::Web
end

map '/api' do
  run ClassRanker::API
end
