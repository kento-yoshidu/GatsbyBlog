import React from "react"

import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import * as Styles from "../styles/toggleButton.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMoon,
  faSun
} from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

{/*
<label className={Styles.toggleSwitch}>
  <input
    type="checkbox"
    onChange={(e) => toggleTheme(e.target.checked ? "dark" : "light")}
    checked={theme === "dark"}
  />{" "}
  Dark mode
</label>
*/}

const ToggleButton = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => {
        const isDark = theme === 'dark'

        const icon = isDark ? (
          <FontAwesomeIcon
            className={Styles.moonIcon}
            icon={faMoon}
          />
        ) : (
          <FontAwesomeIcon
            className={Styles.sunIcon}
            icon={faSun}
          />
        )

        return (
          <div
            className={Styles.wrapper}
            onClick={() => toggleTheme(isDark ? 'light' : 'dark')}
          >
            { icon }
          </div>

        )
      }}
    </ThemeToggler>
  )
}

export default ToggleButton
