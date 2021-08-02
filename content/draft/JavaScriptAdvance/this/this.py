class UnReact:
  def __init__(self, name):
    self.name = name

def some_function(this):
  print(this.name)

hoge = UnReact('hogefoo')
some_function(hoge)

UnReact.some_function = some_function
hoge.some_function()