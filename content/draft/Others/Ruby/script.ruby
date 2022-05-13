obj = "Hello World"

obj.object_id
# 440

puts ObjectSpace._id2ref(440)
#=> Hello World
