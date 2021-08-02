const func = function(){}

console.log(func) //=> [Function: func]

func.test = "hoge"

console.log(func.test)
