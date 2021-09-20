import * as React from "react"

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
		<>
			<Seo
				title="アバウトページ"
				pagepath={pagepath}
			/>

			<Header
				pageTitle="アバウトページ"
			/>
			<p className="txt">jfagp</p>
		</>
	)
}

export default AboutPage