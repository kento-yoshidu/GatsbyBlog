import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Styles = require('../styles/header.module.scss')

type Props = {
  pageTitle?: string,
  pathname?: string
}

const Header: React.VFC<Props> = ({ pageTitle, pathname }) => {
  const { site } = useStaticQuery (
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }`
  )

  return (
    <header className={Styles.header}>
      <h1 className={Styles.headerTitle}>
        {pathname === `/page/1/`
          ? <>{site.siteMetadata.title}</>
          : <Link to="/page/1/">{site.siteMetadata.title}</Link>
        }
      </h1>

      {pageTitle &&
        <h2 className={Styles.pageTitle}>
          { pageTitle }
        </h2>
      }
    </header>
  )
}

export default Header