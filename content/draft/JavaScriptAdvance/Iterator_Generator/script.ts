/*
const iterator = [1, 2, 3].values()

console.log(iterator)

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

for (const i of iterator) {
  console.log(i)
}

/*
const myIterator = {
  next: function () {
    return {
      value: 1,
      done: true
    }
  }
}

console.log([1, 2, 3][Symbol.iterator]().next().value)
*/

interface IItertor {
  num: number;
  next: () => { value?: number, done: boolean }
}

const iterator: IItertor = {
  num: 0,
  next: function() {
    this.num++
    return (this.num <= 3)
      ? { value: this.num, done: false }
      : { done: true}
  }
}

