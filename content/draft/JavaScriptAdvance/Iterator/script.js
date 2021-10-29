const arr = [1, 2, 3]

const arrIterator = arr[Symbol.iterator]()

console.log(arrIterator.next())