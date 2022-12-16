setTimeout(() => {
  console.log(1)
  console.log(2)

  setTimeout(() => {
    console.log(3)
  }, 1000)
}, 1000)
