import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import * as Styles from "../styles/footer.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Footer: React.VFC = () => {

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
      }
    `
  )

  return (
    <footer className={Styles.footer}>
      <h1>
        <Link to="/page/1/">
          { site.siteMetadata.title }
        </Link>
      </h1>

      <div className={`${Styles.link} ${Styles.externalLink}`}>
        <Link
          to={"https://github.com/kento-yoshidu/Gatsby3Blog"}
          target="_blink"
        >
          <FontAwesomeIcon icon={faGithubSquare} />
        </Link>
      </div>

      <div className={`${Styles.link} ${Styles.internalLink}`}>
        <Link
          to={"/series/"}
          target="_blink"
        >
          <FontAwesomeIcon icon={faChevronRight} />
          シリーズ一覧
        </Link>
        <Link
          to={"/tags/"}
          target="_blink"
        >
          <FontAwesomeIcon icon={faChevronRight} />
          タグ一覧
        </Link>
      </div>

      <div className={`${Styles.link} ${Styles.metaLink}`}>
        <Link
          to={"/about/"}
          target="_blink"
        >
          <FontAwesomeIcon icon={faChevronRight} />
          このブログについて
        </Link>

        <Link
          to={"#"}
          target="_blink"
        >
          <FontAwesomeIcon icon={faChevronRight} />
          プライバシーポリシー
        </Link>
      </div>

      <p className={Styles.copyright}>Copyright @ 2021 toriwatari</p>
    </footer>
  )
}

export default Footer