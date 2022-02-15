import React, { ReactNode } from "react"

import KeywordSearch from "./keywordSearch"
import Footer from "./footer"

type Props = {
  children: ReactNode
}

const Layout: React.VFC<Props> = ({ children }) => (
  <>
    <KeywordSearch />

    {children}

    <Footer />
  </>
)

export default Layout
