const obj = { a: 1, b: 2 };

const iterableObj = Object.keys(obj);

console.log(iterableObj)

for (const key of iterableObj) {
	console.log(`key=>${key} : value=>${obj[key]}`)
}
//=> key=>a : value=>1
//=> key=>b : value=>2