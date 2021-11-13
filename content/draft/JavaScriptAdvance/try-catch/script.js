const num = "1";

try {
  if(typeof num !== 'number') {
    throw new Error('数値以外が与えられています。');
  } else {
    console.log(num * 2);
  }
} catch(error) {
  console.log(error.message);
}

console.log("以降の処理");