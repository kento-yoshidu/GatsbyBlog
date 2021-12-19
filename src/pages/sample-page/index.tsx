import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../../components/seo"

import * as Styles from "../../styles/samplePage.module.scss"

const SamplePage = () => (
  <>
    <Seo
      title="Sample page"
    />

    <header className={Styles.header}>
      <h1 className={Styles.headerTitle}>Sample Page</h1>
    </header>

    <div className={Styles.imgWrapper}>
      <StaticImage
        src="../../../static/sample-page/top.jpg"
        alt="風景の画像"
        width={1000}
        height={600}
        layout="fixed"
        style={{ margin: "0 auto"}}
      />
    </div>

    <Link to="./blog/">ブログ</Link>
  </>
)

export default SamplePage