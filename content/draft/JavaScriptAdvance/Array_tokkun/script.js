/*
[...Array(10000)].forEach((_, i) => {
  i++
  if(i % 15 === 0) {
    console.log(`${i} => FizzBuzz`)
  } else if (i % 3 === 0) {
    console.log(`${i} => Fizz`)
  } else if (i % 5 === 0) {
    console.log(`${i} => Buzz`)
  }
  console.log(performance.memory)	
})
*/

const object = [
  {
    node: {
      keywords: ["git", "banana", "linux"]
    }
  },
  {
    node: {
      keywords: ["japan", "america"]
    }
  }
]

const inputs = ["japan"]

const result = object.filter(({node}) => {
  return inputs.every((input) => {
    console.log(node.keywords.indexOf(input) !== -1)
    return node.keywords.indexOf(input) !== -1
  })
})

//console.log(result[0].node)

console.log("git".indexOf("g"))

