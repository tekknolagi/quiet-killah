require 'sinatra'

class ClassRanker
  class Web < Sinatra::Base
    get '/' do
      erb :index
    end
  end # Web
end # ClassRanker
