---
title: "[メモ]Actix WebでAPIサーバーを立てる"
postdate: "2023-06-10"
update: "2023-06-10"
seriesName: "その他"
seriesSlug: "Others"
description: "RustのWebフレームワークであるActix Webに関するメモです。"
tags: ["Rust", "Actix Web"]
keywords: ["Rust", "Actix Web"]
published: false
---

# Actix Web入門

以前から、メインではないにしろRustを書いているのですが、AtCoderの問題を解くとかローカルで動くものばかりなので、外に公開できるものを作ってみたいと思いました。

今回はRustのフレームワークの中でメジャーであると思われるActix Webを利用しAPIサーバーを立てる手順を残したいと思います。極力最小構成で行くつもりです。

[Actix](https://actix.rs/)

現在進行形で勉強中なので適宜記事は追記されます。

現在はPostgreSQLからデータを取得、JSONで返すという所までは進んでいます。これをどうやってデプロイしようかと悩んでいるところです。

## Rustプロジェクト作成

まずは`cargo new <プロジェクト名>`でプロジェクトを作成します。

```bash
$ cargo new web-server
     Created binary (application) `web-server` package
```

作成されたディレクトリに移動し、`cargo run`を実行し`Hello World`が返ってくればOKデス。

```bash
$ cargo run
   Compiling web-server v0.1.0 (C:\github\LearningRust\web-server)
    Finished dev [unoptimized + debuginfo] target(s) in 0.73s
     Running `target\debug\web-server.exe`
Hello, world!
```

## actx-webでサーバー起動

次に、Cargo.tomlに`actix-web = "4"`を追記します。

```toml
[package]
name = "web-server"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
actix-web = "4"
```

次に、main.rsを以下の通りに書き換えます。

```rust
use actix_web::{get, App, HttpResponse, HttpServer, Responder};

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

再度、`cargo run`を実行します。

```bash
$ cargo run
   Compiling web-server v0.1.0 (C:\github\LearningRust\web-server)
    Finished dev [unoptimized + debuginfo] target(s) in 5.91s
     Running `target\debug\web-server.exe`
```

この状態でブラウザーで`localhost:8080`にアクセスしすれば、`Hello World!`という文字列が表示されます。

https://zenn.dev/aula/articles/64fa0bebb99109
