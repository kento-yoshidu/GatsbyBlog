const func1 = () => {
  data = const;
}

const main = () => {
  try {
    func1();
  } catch (error) {
    console.log(`[Error] ${error}`);
  } finally {
    console.log("処理が終了しました");
  }
}

main()

/*
  [Error] ReferenceError: data is not defined
*/
