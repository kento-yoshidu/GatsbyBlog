import React, { ReactNode } from "react"

import Footer from "./footer"

type Props = {
  children: ReactNode
}

const Layout:React.VFC<Props> = ({children}) => (
  <div className="allWrapper">
    {children}

    <Footer />
  </div>
)

export default Layout
