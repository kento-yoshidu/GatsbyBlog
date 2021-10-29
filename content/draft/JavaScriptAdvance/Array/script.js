function func() { return "foo" }

const arr = [func];

console.log(arr[0]());
