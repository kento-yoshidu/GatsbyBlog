---
title: "#2 列挙型とパターンマッチ"
postdate: "2023-10-08"
update: "2023-10-08"
seriesName: "ゆっくり学ぶRust"
seriesSlug: "LearnSlowlyRust"
description: "Rustの列挙型とパターンマッチについて学びます。"
tags: ["Rust", "列挙型"]
keywords: ["Rust", "列挙型", "enum"]
published: false
---

# 列挙型とパターンマッチ

Rustにおいて**列挙型**は、**あらかじめ列挙された値のみをとれる**ことを表す型の一種です。Rustの特徴的な型であるOption型とResult型の理解のためには、まず列挙型を理解しなければなりません。この記事で列挙型を紹介して次の記事ではOption型やResult型を紹介します。

また、列挙型はmatch式と組み合わせることでその力を発揮します。そしてその発展形として`if-let`と`let-else`も学習します。

## とり得る値だけを「列挙」する

例えば、方角を表す変数を用意したいと思います。変数には`West`、`South`、`East`、`North`（東南西北）のいずれかしか入ってほしくありません。こんな時は`enum`を使って`Direction`列挙型を定義します。

```rust
// Direction列挙型の定義
#[derive(Debug)]
#[allow(unused)]
enum Direction {
    West,
    South,
    East,
    North
}
```

この時、`West`、`South`、`East`、`North`といった列挙体がとり得る値は、**列挙子**と呼ばれます。

以下のようにして`Direction`列挙体のインスタンスを生成できます。

```rust
#[derive(Debug)]
#[allow(unused)]
enum Direction {
    West,
    South,
    East,
    North,
}

fn main() {
    let direction = Direction::West;

    println!("{:?}", direction);
    //=> West
}
```

想像に容易いと思いますが、`Direction`列挙体のインスタンスは定義された列挙体以外の値をとることができません（以下、`Direction`列挙体を定義している箇所は省略します）。

```rust
fn main() {
    // NorthEast（北西）なんて方角はとれない
	let directon = Direction::NorthEast;
    /*
        error[E0599]: no variant or associated item named `NorthEast` found for enum `Direction` in the current scope
        --> src/main.rs:11:28
        |
    3   | enum Direction {
        | -------------- variant or associated item `NorthEast` not found for this enum
    ...
    11  |     let directon = Direction::NorthEast;
        |                               ^^^^^^^^^ variant or associated item not found in `Direction`
        }
    */
}
```

### match式と組み合わせる

これだけでは列挙体のメリットはあまり感じないと思いますが、列挙体はmatch式ととても相性がいいです。以下のようにして場合分けができます。

```rust
fn main() {
    let direction = Direction::West;

    match direction {
        Direction::West => {
            println!("東に進む");
        },
        Direction::South => {
            println!("南に進む");
        },
        Direction::East => {
            println!("西に進む");
        },
        Direction::North => {
            println!("北に進む");
        }
    }
    //=> 東に進む
}
```

match式との組み合わせで強力な所は、**全てのパターン（列挙子）を網羅することが強制される**ことです。例えば`North`の場合のパターンを削除してみると、コンパイルに失敗します。`Direction::North`がカバーされていないというエラーメッセージが出力されていますね。

```rust
fn main() {
    let direction = Direction::West;

    match direction {
        Direction::West => {
            println!("東に進む");
        },
        Direction::South => {
            println!("南に進む");
        },
        Direction::East => {
            println!("西に進む");
        },
    }
    /*
        error[E0004]: non-exhaustive patterns: `Direction::North` not covered
        --> src/main.rs:13:11
        |
        13 |     match direction {
        |           ^^^^^^^^^ pattern `Direction::North` not covered
        |
    */
}
```

なお、match式は（その名の通り）「式」なので、値を返すことができます。

```rust
fn main() {
	let direction = Direction::North;

    // msgは&str型
	let msg = match direction {
        Direction::West => {
            "東に進む"
        },
        Direction::South => {
            "南に進む"
        },
        Direction::East => {
            "西に進む"
        },
        Direction::North => {
            "北に進む"
        },
    };

	println!("{}", msg);
    //=> 北に進む
}
```

### 引数として受け取る

関数の引数に列挙体を指定する場合を考えてみます。以下のようにして引数が`Direction`列挙体の列挙子であることを指定します。更にmatch式を用いることで、引数が`Direction`列挙体であり、かつ、全ての列挙子のパターンをカバーしている関数を定義することができます。

```rust
fn check_directon(direction: Direction) {
    let msg = match direction {
        Direction::West => {
            "東に進む"
        },
        Direction::South => {
            "南に進む"
        },
        Direction::East => {
            "西に進む"
        },
        Direction::North => {
            "北に進む"
        }
    };

	println!("{}", msg);
    //=> 西に進む
}

fn main() {
    check_directon(Direction::East);
}

```

### 列挙子は値を持てる

各列挙子は値を持つことができます。まずは各列挙子がどのような型の値を持つかを定義します。

```rust
#[derive(Debug)]
#[allow(unused)]
enum Direction {
    West(usize),
    South(usize),
    East(usize),
    North(usize),
}
```

次に`()`で値を渡し、値を持ったインスタンスを生成します。

```rust
fn main() {
    let direction = Direction::North(10);
}
```

`check_direction`関数においては、各パターンを`Direction::West(変数)`のようにすれば、列挙子の値を変数に束縛できます。

```rust
fn check_directon(direction: Direction) {
    match direction {
        Direction::West(distance) => {
            println!("東に{}メートル進む", distance);
        },
        Direction::South(distance) => {
            println!("南に{}メートル進む", distance);
        },
        Direction::East(distance) => {
            println!("西に{}メートル進む", distance);
        },
        Direction::North(distance) => {
            println!("北に{}メートル進む", distance);
        },
    }
}

fn main() {
    let direction = Direction::North(10);

    check_directon(direction);
    //=> 北に10メートル進む
}
```

---

列挙子はそれぞれ異なる型の値を持つことができます。さらに、`usize`などのプリミティブな型だけではなく、構造体なども値として持つことができます。

`Direction`列挙体に新たに`NorthEast`列挙子を追加します。その名の通り、北西を表現する列挙子です。値は`north`、`east`というフィールドを持つ無名構造体です。

```rust
#[allow(unused)]
#[derive(Debug)]
enum Direction {
	West(usize),
	South(usize),
	East(usize),
	North(usize),
	NorthEast { north: usize, east: usize },
}

fn main() {
    let direction = Direction::NorthEast {
        north: 10,
        east: 20
    };
}
```

`check_direction`関数は以下のように書き換えて`NorthEast`とパターンマッチさせましょう。

```rust
fn check_directon(direction: &Direction) {
    match direction {
        Direction::West(distance) => {
            println!("東に{}メートル進む", distance);
        },
        Direction::South(distance) => {
            println!("南に{}メートル進む", distance);
        },
        Direction::East(distance) => {
            println!("西に{}メートル進む", distance);
        },
        Direction::North(distance) => {
            println!("北に{}メートル進む", distance);
        },
		Direction::NorthEast { north: n, east: e } => {
			println!("北に{}メートル、西に{}メートル進む", n, e);
		}
    }
}

fn main() {
	let direction = Direction::NorthEast {
		north: 10,
		east: 20
	};

	check_directon(&direction);
}
```

## if-let構文

さて、これまでは`West`、`South`、`East`、`North`のそれぞれに個別にどのような文を出力するかを明示してきました。ここで`North`の時だけ何かを処理にして、それ以外の時は何もしない、という状況を考えたいと思います。

`North`の時の処理を書いて、続けて`_`というパターンを用意します。これで`North`以外の全ての列挙子、という意味になります。

```rust
fn check_directon(direction: Direction) {
    match direction {
        Direction::North(distance) => {
            println!("北に{}メートル進む", distance);
            //=> 北に10メートル進む
        },
		_ => {}
        // North以外は何もしない
    }
}

fn main() {
	let direction = Direction::North(10);

	check_directon(direction);
}
```

これでも「`North`の時だけ何かしたい」という目的は達していますが、ちょっと冗長というか、`_ => {}`という部分がコードの美しさを損なっている気がします。

そういう時は`if-let`を使用しましょう。ひとまず構文は以下のようになります。

```rust
fn main() {
	let direction = Direction::West(10);

	if let Direction::West(distance) = direction {
		println!("東に{}メートル進む", distance);
        // 東に10メートル進む
	}
}
```

といっても初見だと何をしているか分かりにくいですね。

### 論駁可能性

先ほどの構文、`if let xx = yy {}`の`let xx = yy`の部分に注目してみましょう。これはいわゆる変数に値を束縛している、お馴染みの構文ですね。

https://qiita.com/plotter/items/0d8dc2782f21178d64f1

https://www.programiz.com/rust/enum
