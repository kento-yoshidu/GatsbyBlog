const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`time: ${time}`);
      resolve();
    }, time) // 受け取ったtimeミリ秒待って出力する
  })
}

const main = async () => {
  const times = [
    1000,
    2000,
    3000,
    1500
  ];

  for (const time of times) {
    await wait(time)
  }

  console.log("処理が終了しました");
}

main();

/*
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
*/
