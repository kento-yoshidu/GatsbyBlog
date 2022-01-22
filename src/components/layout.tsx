import React, { ReactNode } from "react"

import Search from "./searchBox"
import Footer from "./footer"
import { KeywordSearch } from "./keywordSearch"

type Props = {
  children: ReactNode
}

const Layout: React.VFC<Props> = ({children}) => (
  <>
    {/*<KeywordSearch />*/}
    <Search />

    {children}

    <Footer />
  </>
)

export default Layout
