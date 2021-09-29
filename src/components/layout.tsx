import React, { ReactNode } from "react"

type Props = {
	children: ReactNode
}

const Layout:React.VFC<Props> = ({children}) => (
	<div className="allWrapper">
		{children}
	</div>
)

export default Layout
