import React, { ReactNode } from "react"

import Tool from "./tool"
import Footer from "./footer"

type Props = {
  children: ReactNode
}

const Layout: React.VFC<Props> = ({ children }) => (
  <>
    <Tool />

    {children}

    <Footer />
  </>
)

export default Layout
