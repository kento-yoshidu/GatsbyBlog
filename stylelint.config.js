module.exports = {
  "extends": [
    "stylelint-config-standard",
  ],
  "defaultSeverity": "warning",
  "customSyntax": "postcss-scss",
  "ignoreFiles": [
    "**/_reset.scss"
  ],
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "extends",
        "tailwind"
      ]
    }],
    "indentation": 2,
    "color-function-notation": "legacy",
    "alpha-value-notation": "number",
    "function-no-unknown": null
  }
}
