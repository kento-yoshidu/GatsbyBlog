module.exports = {
  "extends": [
    "stylelint-config-standard",
  ],
  "defaultSeverity": "warning",
  "ignoreFiles": [
    "src/css/*.css"
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
