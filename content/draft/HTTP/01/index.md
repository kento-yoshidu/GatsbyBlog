---
title: "パケットキャプチャで学ぶHTTP"
postdate: "2023-01-01"
update: "2023-01-01"
seriesName: "パケットキャプチャで学ぶHTTP"
seriesSlug: "HTTPProtocol"
tags: ["HTTP", "Wireshark"]
keywords: ["HTTP3"]
published: false
---

# HTTPについて復習

このような辺境のブログを見ている紳士淑女の皆様であれば、HTTPやネットワークの概要はご存じだと思いますので、本当に基本的な部分（Webサーバーって何？TCPって何？など）はざっと解説するに留まります。

# HTTPの歴史

HTTPは**Webページを閲覧するため**に生まれた通信プロトコルです。**HyperText Transfer Protocol**の略称であり、ハイパーテキスト（htmlファイルなど）をやり取りできるプロトコルです。

<aside>

たまに「HTTPプロトコル」と記している所がありますが、プロトコルプロトコルとなるので正しくありません。しかし気持ちは分かります。私も口頭では「HTTPプロトコル」と言ってしまう時があります。

</aside>

そのシンプルさが故か、今ではAPI呼び出しやgRPC、認可プロトコルなど幅広く利用されています。しかし、今回のシリーズではあくまでもWebページの表示を元に話を進めます。

HTTPの仕組みは非常にシンプルです。WebサーバーとWebブラウザーがHTTPリクエスト、HTTPレスポンスでhtmlやcssなどのファイルをやり取りします。

## 標準化

HTTP/1.1はRFC2068、RFC2616を経て、RFC7230~RFC7235と改訂された。これらを

- HTTP Semantics
- HTTP Caching
- HTTP/1.1

という3つの仕様に分離しようとしている。

## HTTPメッセージ

HTTPメッセージをやり取りして通信を実現する。HTTPメッセージは「ヘッダーセクション」「コンテンツ」「トレーラーセクション」の3つから構成される。これらの名称はHTTP/2登場時に整理された。

### HTTPフィールド

HTTPフィールドは**メタデータ**のこと。キー・バリュー形式で書かれている。

### コンテンツ

通信で送られるデータ。

## HTTPリクエスト

HTTPメッセージの中でも、クライアントからサーバー側に送られるメッセージを、特にHTTPリクエストという。

### HTTP/1.1

リクエストヘッダー。

```bash
$ curl --verbose --http1.1 https://example.com

GET / HTTP/1.1
Host: example.com
User-Agent: curl/7.74.0
Accept: */*
```

1行目をリクエストラインという。「メソッド」「パス」「HTTPのバージョン」という並びになっている。

2行名からはリクエストヘッダーフィールド。リクエスト内容やブラウザーにより、内容は様々。

リクエストヘッダーの後に空白行を開けて、コンテンツが続く。GETメソッドの場合は空。

レスポンスヘッダー。


```bash
$ curl --verbose --http1.1 https://example.com

HTTP/1.1 200 OK
Age: 493354
Cache-Control: max-age=604800
Content-Type: text/html; charset=UTF-8
Date: Sun, 20 Feb 2022 08:10:55 GMT
Etag: "3147526947+ident"
Expires: Sun, 27 Feb 2022 08:10:55 GMT
Last-Modified: Thu, 17 Oct 2019 07:18:26 GMT
Server: ECS (sec/96A6)
Vary: Accept-Encoding
X-Cache: HIT
Content-Length: 1256
```

1行目をステータスラインという。「HTTPバージョン」「ステータスコード」「リーズンフレーズ」という並びになっている。

2行目からがレスポンスヘッダーフィールド。

リクエストと同じく、1行空けてコンテンツが続く。

### HTTP2

2015年に**RFC 7540**で標準化された。ヘッダーを圧縮する**HPACK**もRFC 7541として標準化された。

## HTTP1.1の問題

Head-of-Line-Block問題。Keep-Aliveではリクエストされた順番でレスポンスを返す必要がある。そのためあるレスポンスが遅れると後続のレスポンスが遅れることになる。

### メッセージの並列化

HTTP2では一つのTCPコネクションでHTTPメッセージを並列的にやり取りする。

リクエストとレスポンスは**ストリーム**という単位で管理される。

一つのHTTPメッセージを**フレーム**という単位に分割して送受信する。フレームはバイナリ。

フレーム内に格納される情報は、**ビット単位で格納位置が決められている**。これにより、リクエストとレスポンスが紐づき、リクエストの順番どおりにレスポンスを返す必要がなくなり、Head-of-Line-Blockingが解消される。

### TCPのHead-of-Line-Blocking問題

TCPにおいても、パケットが送信された順番通りにパケットを処理する必要があり、パケットロスが起きた時には後続がブロッキングされることになる。そのため、TCPではなくUPDを利用する方向に話が進む。


## QUIC

HTTP3では、TCPではなくQUICというプロトコルを使う。HTTP3では、ストリームは別のストリームの影響を受けない。

## HTTP3の標準化

2013~2016年にGoogle QUICが登場、実験。

2016年~2018年に、HTTO over QUICの標準化。

2018年~、QUICに改名する動きが起きる。


HTTP/1.1はテキスト形式だが、HTTP/2はバイナリ。



## 参考

[](https://gihyo.jp/admin/serial/01/http3/0001)

https://qiita.com/m_mizutani/items/dc331fa89ca9b7c2a0fe






https://qiita.com/unsoluble_sugar/items/b080a16701946fcfce70

