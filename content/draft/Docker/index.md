---
title: "Docker"
postdate: "2099-01-01"
update: "2099-01-01"
seriesName: "Docker"
seriesSlug: "Docker"
description: ""
tags: ["Docker"]
draft: true
---


# Kubernetes

Kubernetesはコンテナーのオーケストレーションツールです。オーケストラにおける指揮者の様に、多数のコンテナーを管理できるツールです。

Kubernetesはあるべき状態を宣言し、その状態に保つ役割があると言えます。
## マスターノード

後述するワーカーノードを管理するノードです。あくまで管理を行うのみであり、コンテナーエンジンなどは必要ない。しかし、**etcd**というデータベースを用意し、そこでコンテナーの状態管理などを行う。

## ワーカーノード

Dockerなどのコンテナーエンジンを入れ、サーバーとなるノード

マスターノードとワーカーノードには、共にKubernetesとCNI（仮想ネットワークのドライバー）のインストールが必要。

## コントロールプレイン

マスターノードでは5つのコンポーネントから構成される。ワーカーノードを管理する。

|名称|説明|
|---|---|
|kube-apiserver|外部とのやり取り|
|kube-controller-manager|コントローラーの管理|
|kube-scheduler|Podをワーカーノードに割り当てる|
|cloud-controller-manager|クラウドサービスと連携、サービスを作成する|
|etcd|クラスター情報の管理|

ワーカーノードでは2つのコンポーネントから構成される

|名称|説明|
|---|---|
|kube-let|kube-schedulerと連携し、ワーカーノード上にPodを配置し実行する。実行中のPodの状態を定期的に監視し、kube-schedulerに通知する。|
|kube-proxy|ネットワーク通信をルーティングする|

## 参考

[Dockerって何？ って聞かれたときの解説、の解説](https://zenn.dev/koduki/articles/b4cb0551523919)
