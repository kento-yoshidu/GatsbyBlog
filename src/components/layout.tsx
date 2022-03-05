import React, { ReactNode } from "react"

import Tool from "./Tool"
import Footer from "./footer"

type Props = {
  children: ReactNode
}

const Layout: React.VFC<Props> = ({ children }) => (
  <>
    {/*
    <KeywordSearch />

    <ToggleButton />
    */}

    <Tool />

    {children}

    <Footer />
  </>
)

export default Layout
