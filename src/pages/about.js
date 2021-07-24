import * as React from "react"
import { /*Link,*/ graphql } from "gatsby"

import Header from "../components/header"

const AboutPage = ({ data, location }) => {
	return (
		<div>
			<Header
				pathname={location.pathname}
			/>
			<p className="txt">jfagp</p>
		</div>
	)
}

export default AboutPage