require 'grape'
require './helpers'

class ClassRanker
  class API < Grape::API
    format :json

    params do
      requires :call_num, :type => String
    end
    get '/rank' do
        call_num = params[:call_num].strip
        klass = $classes[call_num]

        if not klass
          error!({ :error => 'No such class.' }, 400)
        else
          { :rank => klass }
        end
    end # '/rank'
  end # API
end # ClassRanker
