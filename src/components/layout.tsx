import React, { ReactNode } from "react"

import Search from "./searchBox"
import Temp from "./temp"
import Footer from "./footer"

type Props = {
  children: ReactNode
}

const Layout: React.VFC<Props> = ({children}) => (
  <>
    <Temp />
    <Search />

    {children}

    <Footer />
  </>
)

export default Layout
