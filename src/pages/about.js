import * as React from "react"

import Header from "../components/header"

const AboutPage = ({ /*data,*/ location }) => {
	return (
		<>
			<Header
				pathname={location.pathname}
			/>
			<p className="txt">jfagp</p>
		</>
	)
}

export default AboutPage