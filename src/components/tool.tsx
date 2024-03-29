import React from "react"

import KeywordSearch from "./keywordSearch"
import ToggleButton from "./toggleButton"

import * as Styles from "../styles/tool.module.css"

const Tool = () => (
  <div className={Styles.wrapper}>
    <KeywordSearch />
    <ToggleButton />
  </div>
)

export default Tool
