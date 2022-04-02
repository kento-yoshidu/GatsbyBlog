// ## indexOf

// 指定した文字列があるかないかを走査し、あればインデックス番号、なければ-1を返す

'Hello World'.indexOf('Hello') // 0
'Hello World'.indexOf('World') // 6
'Hello World'.indexOf('JavaScript') // -1

// 部分的に含まれている場合もインデックス番号が返ってくる

'Hello World'.indexOf('He') // 0

// 返ってくるのは最初のインデックス番号、複数あっても一つしか返らない
'Hello World'.indexOf('l') // 2

// ### 前方一致

'Hello World'.indexOf('Hello') === 0 // true
'Hello World'.indexOf('World') === 0 // false

// ### startWith[ES2015]

// しかしこれは、`startsWith`メソッドで代用できます。戻り値はbooleanです。

'Hello World'.startsWith('H') // true
'Hello World'.startsWith('e') // false

/*
console.log("b".localeCompare("b")); //=> 0
console.log("b".localeCompare("a")); //=> 1
console.log("b".localeCompare("c")); //=> 0


console.log("b".localeCompare("B")); //=> 0
*/

type Data = {
  node: {
    keywords: string[]
  }
}

const allData: Data[] = [
  {
    node: {
      keywords: ["Gatsby", "Blog"]
    }
  },
  {
    node: {
      keywords: ["Git", "git log"]
    }
  },
  {
    node: {
      keywords: ["Git", "git log", "git commit"]
    }
  }
]

const inputtedKeywords = "Gatsby log"

const lowerCaseKeywords: string[] | null = inputtedKeywords
  .trim()
  .toLocaleLowerCase()
  .match(/[^\s]+/g)

const result: Data[] = allData.filter((data: Data) => {
  return lowerCaseKeywords?.every((keyword: string) => {
    // return data.node.keywords.toString().toLowerCase().indexOf(keyword) !== -1
    return data.node.keywords.toString().toLowerCase().includes(keyword)
  })
})

result.map((r) => {
  console.log(r)
})
