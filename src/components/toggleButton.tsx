import React from "react"

import { ThemeToggler } from 'gatsby-plugin-dark-mode'

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
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )

        return (
          <button
            onClick={() => toggleTheme(isDark ? 'light' : 'dark')}
          >
            { icon }
          </button>

        )
      }}
    </ThemeToggler>
  )
}

export default ToggleButton
