function fet() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("start");
      resolve()
    }, 1000);
  })
}

async function hidouki() {
  const a = await fet();
  console.log("end")
}

hidouki();