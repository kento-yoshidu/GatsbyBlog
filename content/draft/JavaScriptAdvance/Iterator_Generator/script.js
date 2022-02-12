const iterator = {
  value: 0,

  next: function() {
    if (this.value < 3) {
      this.value++
      return {
        value: this.value,
        done: false
      }
    } else {
      return {
        done: true
      }
    }
  }
}

while(iterator.next().done === false) {
  console.log(iterator.value)
  //=> 1
  //=> 2
  //=> 3
}
