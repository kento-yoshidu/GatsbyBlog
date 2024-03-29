import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import * as Styles from "../styles/footer.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"

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
      <h1 className={Styles.footerTitle}>
        <Link to="/page/1/">
          {site.siteMetadata.title}
        </Link>
      </h1>

      <div className={`${Styles.link} ${Styles.externalLink}`}>
        <Link
          to={"https://github.com/kento-yoshidu/Gatsby3Blog"}
          aria-label="GitHubリポジトリーへのリンク"
        >
          <FontAwesomeIcon icon={faGithubSquare} />
        </Link>
      </div>

      <div className={`${Styles.link} ${Styles.internalLink}`}>
        <Link to={"/series/"}>
          <FontAwesomeIcon icon={faChevronRight} />
          シリーズ一覧
        </Link>

        <Link to={"/tags/"}>
          <FontAwesomeIcon icon={faChevronRight} />
          タグ一覧
        </Link>
      </div>

      <div className={`${Styles.link} ${Styles.metaLink}`}>
        <Link
          to={"/about/"}
        >
          <FontAwesomeIcon icon={faChevronRight} />
          このブログについて
        </Link>
      </div>

      <p className={Styles.copyright}>Copyright @ 2022 toriwatari</p>
    </footer>
  )
}

export default Footer
