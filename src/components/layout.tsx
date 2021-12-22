import React, { ReactNode } from "react"

import Footer from "./footer"

type Props = {
  children: ReactNode
}

const Layout: React.VFC<Props> = ({children}) => (
  <>
    {children}

    <Footer />
  </>
)

export default Layout
