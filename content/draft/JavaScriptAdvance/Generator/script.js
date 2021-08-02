// ジェネレーター関数
function* myGenerator(range) {

  let prev = 1;

  let current = 1;

  for (let i = 0; i < range; i++) {
    console.log(i);
    [current, prev] = [prev + current, current];

    yield [current, prev];
  }
}

const gen = myGenerator(10);

while(true) {
  console.log(gen.next().done);
}
