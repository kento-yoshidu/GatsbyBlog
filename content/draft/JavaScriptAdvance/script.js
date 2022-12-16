const closure = (start) => {
  let state = start

  return () => {
    return state++
  }
}

const counter = closure(0)
console.log(counter())
console.log(counter())
console.log(counter())

const counter2 = closure(3)
console.log(counter2())
console.log(counter2())
console.log(counter2())
