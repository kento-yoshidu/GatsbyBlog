import * as React from "react"

import Layout from "../components/layout"
import Header from "../components/header"
import Seo from "../components/seo"

import * as Styles from "../styles/404.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUndo } from "@fortawesome/free-solid-svg-icons"

type Props = {
  location: {
    pathname: string
  }
}

const AboutPage: React.VFC<Props> = ({ location }) => {
  const pagepath=location.pathname

  return (
    <Layout>
      <Seo
        title="このブログについて"
        pagepath={pagepath}
        description="このブログは私の個人ブログです。GatsbyというWebフレームワークを使用して作成しました。"
      />

      <Header
        pageTitle="このブログについて"
      />

      <div className={Styles.dateInfo}>
        <FontAwesomeIcon icon={faUndo} className={Styles.icon}/>
        更新日時
        <time className={Styles.time}>2021.12.22</time>
      </div>

      <main className={Styles.main}>
        <section>
          <h2 className={Styles.h2Title}>このブログは何なのか</h2>
          <p>このブログは<a href="https://github.com/kento-yoshidu/">私</a>の個人ブログです。</p>
          <p>GatsbyというWebフレームワークを使用して作成しました。Githubのリポジトリは<a href="https://github.com/kento-yoshidu/GatsbyBlog/" target="_blink">こちら(外部リンク)</a>です。</p>

          <h3 className={Styles.h3Title}>📝 何を書いているのか</h3>
          <p>基本的にIT、プログラミングに関することを書いています。あと、技術には全然関係ない日記代わりにも使いたいと思います。</p>

          <h3 className={Styles.h3Title}>🔖 記事をシリーズ・タグ分けしています</h3>
          <p>単発で終わるような記事ではなくシリーズ化した一連の記事をたくさん書きたいと思っています。そのため、記事ごとにシリーズ分類を設けました。また、タグも付与しています。</p>
        </section>

        <section>
          <h2 className={Styles.h2Title}>このブログのモットー</h2>
          <h3 className={Styles.h3Title}>⚙️ 最小構成</h3>
          <p>技術を説明するにあたり、その環境はできる限りの最小構成を目指します。</p>
          <p>「Node.jsからMongoDBへの接続方法を紹介します」という解説ページがあったとして、「MongoDBはDockerで用意します」だとDockerがわからない人はその時点で躓きますよね🙀。</p>
          <p>私自身そういうことに多く遭遇したので、私はできるだけシンプルな環境で「とにかく一つのことだけに集中して理解する」場を作りたいです。その結果、記事数が多くなったり1ページの分量が長くなったりするかもしれませんが、メリットや分かりやすさの向上も大きいと思っています。</p>

          <h3 className={Styles.h3Title}>👞 スモールステップでハンズオン</h3>
          <p>目標は細かく、小さく設定します。そしてハンズオン形式で手を動かし、その都度結果を確認します。</p>

          <h3 className={Styles.h3Title}>🥇 世界一「参考」の多い記事を目指す</h3>
          <p>このブログ上に、私が生み出したオリジナルの考えやテクニック、私しか知らない知識は一つもありません。全てはインターネットや書籍から拾い上げた情報です。記事を書く上で参考にしたページや書籍は出来る限り「参考」としてリンクを貼って紹介したいと思います。</p>
          <p>参考としてリンクを張ることには以下のようなメリットがあると考えています。</p>

          <ul className={Styles.list}>
            <li>1️⃣ 情報を発信してくれた先人・巨人への感謝を伝え、読者に紹介する（リンク先のSEO的にも多少有利になる？）</li>
            <li>2️⃣ 「もっと詳しい情報が欲しい」と思う読者への道標になる</li>
            <li>3️⃣ どの情報を参照したかを整理することで、筆者自身のデータベースになる</li>
          </ul>

          <p>世界一は言い過ぎでした、上位10%位を目指します。</p>

          <h3 className={Styles.h3Title}>📅 日時情報は大事</h3>
          <p>当ブログのほとんど全てのページには、「投稿日時」「更新日時」を記載しています。</p>
          <p>個人的な感覚ですが、「投稿日」や「更新日時」が記載されていないページはあまり参考にする気が起きません。これは技術情報だけではなくて、商品のレビューをしているものや、個人の日記のようなものも含めです。私はページを訪れた際、タイトルの次に自然と日時情報を確認します。</p>
          <p>「SEOに有利だから」<strong>ではなく</strong>、ユーザーに日時情報を伝えるため、「更新されている」ないし「更新されていない」ことを知らせるため、日時情報は多くのページで必須だと思っています。</p>
        </section>
      </main>
    </Layout>
  )
}

export default AboutPage
