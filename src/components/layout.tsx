import React, { ReactNode } from "react"

import KeywordSearch from "./keywordSearch"
import ToggleButton from "./toggleButton"
import Footer from "./footer"

type Props = {
  children: ReactNode
}

const Layout: React.VFC<Props> = ({ children }) => (
  <>
    <KeywordSearch />

    <ToggleButton />

    {children}

    <Footer />
  </>
)

export default Layout
