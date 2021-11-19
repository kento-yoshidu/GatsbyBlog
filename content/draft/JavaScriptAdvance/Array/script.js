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