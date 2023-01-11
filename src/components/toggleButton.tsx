import React from "react"

import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import * as Styles from "../styles/toggleButton.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMoon,
  faSun
} from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const ToggleButton = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }: { theme: "light" | "dark", toggleTheme: Function }) => {
        const isDark = theme === "dark"

        return (
          <button
            className={Styles.wrapper}
            onClick={() => toggleTheme(isDark ? "light" : "dark")}
            aria-label="テーマ切り替え"
          >
            {isDark ? (
              <FontAwesomeIcon
                className={Styles.moonIcon}
                icon={faMoon}
              />
            ) : (
              <FontAwesomeIcon
                className={Styles.sunIcon}
                icon={faSun}
              />
            ) }
          </button>

        )
      }}
    </ThemeToggler>
  )
}

export default ToggleButton
