const obj = {
  name: 'kento',
  returnThis: function() {
    console.log(this.name)
  }
};

obj.returnThis()
