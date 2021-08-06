  def to_proc
    puts "to_procが呼ばれました！"
  end

p [].map(&:upcase) #=> to_procが呼ばれました!