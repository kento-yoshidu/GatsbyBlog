import React from "react"

const Styles = require('../styles/test.module.scss')

type Props = {
	message: string
}

const Test: React.VFC<Props> = ({ message }) => (
	<p className={Styles.test}>
		{message}
	</p>
)

export default Test