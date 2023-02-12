import React, { ReactNode } from "react"

import Tool from "./tool"
import Footer from "./footer"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

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
