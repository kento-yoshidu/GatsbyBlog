import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import * as Styles from "../styles/header.module.scss"

const Header = ({ pageTitle, pathname }) => {
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

	let siteTitle

	if (pathname === '/') {
		siteTitle = (
			<h1 className={Styles.headerTitle}>{ site.siteMetadata.title }</h1>
		)
	} else {
		siteTitle = (
      <h1 className={Styles.headerTitle}>
        <Link to="/page/1/">{ site.siteMetadata.title }</Link>
      </h1>
		)
	}

	return (
		<header className={Styles.header}>
			{ siteTitle }

			<h2 className={Styles.pageTitle}>
				{ pageTitle }
			</h2>
		</header>
	)
}

export default Header