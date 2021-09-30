import * as React from "react"

import Layout from "../components/layout"
import Header from "../components/header"
import Seo from "../components/seo"

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
				title="アバウトページ"
				pagepath={pagepath}
			/>

			<Header
				pageTitle="アバウトページ"
			/>
			<p className="txt">jfagp</p>
		</Layout>
	)
}

export default AboutPage