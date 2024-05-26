const square = (arg) => {
  return new Promise((resolve, reject) => {
    if (typeof arg !== "number") {
      return reject(`square: ${arg}は数値ではないので計算できません`);
    }

    return setTimeout(() => {
      resolve(`square: ${arg}`)
    }, 2000)
  })
}

const cubed = (arg) => {
  return new Promise((resolve, reject) => {
    if (typeof arg !== "number") {
      return reject(`cubed: ${arg}は数値ではないので計算できません`);
    }

    return setTimeout(() => {
      resolve(`cubed: ${arg * arg * arg}`);
    }, 2000)
  })
}

const main = () => {
  console.log("処理スタート")

  square(4)
    .then((result) => {
      console.log(result);

      return cubed(4)
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      console.log("処理完了");
    })
}

const main2 = () => {
  Promise.any([
    square(10),
    cubed(20),
  ])
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("処理完了");
    })
}

console.log(Promise.resolve(4 * 4).state);
