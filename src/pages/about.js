import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Header from "../components/header"
import Footer from "../components/footer"

const AboutPage = ({ data, location }) => {

  const siteData = data.siteData

  return (
    <div>
      <SEO
        title={siteData.siteMetadata.title}
      />

      <Header
        headerTitle={siteData.siteMetadata.title}
        pageTitle="このブログについて"
        isTopPage={ false }
      />

      <main className="main aboutMain">
        <section>
          <h2>このブログは何なのか</h2>
          <p>このブログは<a href="https://github.com/kento-yoshidu">私</a>の個人ブログです。自称ITエンジニアですので、技術をアウトプットできる空間、そして転職時のポートフォリオになればいいと思い作成しました。</p>
          <p>このブログはGatsbyという静的サイトジェネレータを使用して作成しました。Githubのリポジトリは<a href="https://github.com/kento-yoshidu/GatsbyBlog" target="_blink">こちら(外部リンク)</a>です。</p>
        </section>

        <section>
          <h3>何を書いているのか</h3>
          <p>基本的にIT、プログラミングに関することを書いています。私はWeb開発への転職を目指していますので、HTMLやCSS、JavaScriptの記事が多めです。</p>
          <p>あと、技術には全然関係ない日記代わりにも使いたいと思います。</p>

          <h3>カテゴリ分けしています</h3>
          <p>単発で終わるような記事ではなくシリーズ化した一連の記事をたくさん書きたいと思っています。そのため、記事ごとにカテゴリ分類を設けました。</p>
        </section>

        <section>
          <h2>このブログのモットー</h2>
          <h3>最小構成</h3>
          <p>技術を説明するにあたり、その環境はできる限りの最小構成を目指します。</p>
          <p>「Node.jsからMongoDBへの接続方法を紹介します」という解説ページがあったとして、「スクリプトはTypeScriptで用意します」だとTypeScriptがわからない人はその時点で躓きますよね<span class="emoji">🙀</span></p>
          <p>私自身そういうことに多く遭遇したので、私はできるだけシンプルな環境で「とにかく一つのことだけに集中して理解する」場を作りたいです。その結果、記事数が多くなったり1ページの分量が長くなったりするかもしれませんが、メリットや分かりやすさの向上も大きいと思っています。</p>

          <h3>スモールステップでハンズオン</h3>
          <p>目標は細かく、小さく設定します。そしてハンズオン形式で手を動かし、その都度結果を確認します。</p>

          <h3>世界一参考の多い記事を目指す</h3>
          <p>このブログ上に、私が生み出したオリジナルの考えやテクニック、私しか知らない知識は一つもありません。全てはインターネットや書籍から拾い上げた情報です。記事を書く上で参考にしたページや書籍は出来る限り「参考」としてリンクを貼って紹介したいと思います。</p>
          <p>参考としてリンクを張ることには以下のようなメリットがあると考えています。</p>

          <ul>
            <li>情報を発信してくれた先人への感謝を伝え、読者に紹介する（リンク先のSEO的にも多少有利になる？）</li>
            <li>「もっと詳しい情報が欲しい」と思う読者への道標になる</li>
            <li>どの情報を参照したかを整理することで、筆者自身のデータベースになる</li>
          </ul>

          <p>世界一は言い過ぎでした、上位10%位を目指します。</p>

          <h3>日時情報は大事</h3>
          <p>当ブログの全てのページには、「投稿日時」「更新日時」を記載しています。</p>
          <p>個人的な感覚ですが、「投稿日」や「更新日時」が記載されていないページはあまり参考にする気が起きません。これは技術情報だけではなくて、商品のレビューをしているものや、個人の日記のようなものも含めです。私はページを訪れた際、タイトルの次に自然と日時情報を確認します。</p>
          <p>「SEOに有利だから」<strong>ではなく</strong>、ユーザに日時情報を伝えるため、「更新されている」ないし「更新されていない」ことを知らせるため、日時情報は多くのページで必須だと思っています。</p>
          <p>また、先ほど「参考を出来るだけたくさん貼る」と述べましたが、日時情報が明記されていない記事に関しては、参考にしていたとしてもリンクは貼っていません。</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    siteData: site {
      siteMetadata {
        title
      }
    }
  }
`
