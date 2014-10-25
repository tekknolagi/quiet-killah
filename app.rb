require 'sinatra'

class ClassRanker
  class Web < Sinatra::Base
    get '/' do
      erb :index
    end

    get '/about' do
      erb :about
    end
  end # Web
end # ClassRanker
