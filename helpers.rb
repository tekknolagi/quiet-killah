require 'open-uri'
require 'json'

$profs = JSON.parse(open('http://tufts-university-api.herokuapp.com/api/profToCourse').read)
$classes = JSON.parse(open('http://tufts-university-api.herokuapp.com/api/callToCourse').read)

def rank_professor prof
  $profs[prof] - 1
end

def rank_mon_fri klass
  ((klass['schedule']['mon'] != '') ? 1 : 0) + ((klass['schedule']['fri'] != '') ? 1 : 0)
end

def rank_weekend klass
  ((klass['schedule']['sat'] != '') ? 2 : 0) + ((klass['schedule']['sun'] != '') ? 2 : 0)
end

def is_morning sched
  sched.select do |day, time|
    if time == ""
      false
    else
      start = time.split('-')[0].split(':')[0].to_i
      start >= 8 && start <= 11
    end
  end.length > 0
end

def is_night sched
  sched.select do |day, time|
    if time == ""
      false
    else
      fin = time.split('-')[1].split(':')[0].to_i
      fin >= 5 && fin <= 9
    end
  end.length > 0
end

def rank_times klass
  (is_morning(klass['schedule']) ? 1 : 0) + (is_night(klass['schedule']) ? 1 : 0)
end

def rank klass
  [
    rank_mon_fri(klass),
    rank_weekend(klass),
    rank_times(klass),
    rank_professor(klass['prof'])
  ].inject(:+)
end

$profs = Hash[$profs.map do |name, classes|
    [name, classes.length]
  end]
$classes = Hash[$classes.map do |call_num, klass|
    [call_num, klass.store(:rank, rank(klass))]
  end]
