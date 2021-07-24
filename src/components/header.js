import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"


const Header = ({ pageTitle, isTopPage, pathname }) => {
	console.log(pathname)

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
			<h1>{ site.siteMetadata.title }</h1>
		)
	} else {
		siteTitle = (
      <h1>
        <Link to="/">{ site.siteMetadata.title }</Link>
      </h1>
		)
	}

	return (
		<header>
			{ siteTitle }
		</header>
	)
}

export default Header