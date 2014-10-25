require 'grape'
require './helpers'

class ClassRanker
  class API < Grape::API
    format :json

    get '/worst' do
      $classes.max_by do |klass|
        klass[1]
      end
      { :class => klass[0], :rank => klass[1] }
    end

    get '/best' do
      klass = $classes.min_by do |klass|
        klass[1]
      end
      { :class => klass[0], :rank => klass[1] }
    end

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
