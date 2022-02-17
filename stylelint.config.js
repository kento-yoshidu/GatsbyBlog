module.exports = {
  "extends": [
    "stylelint-config-standard"
  ],
  "defaultSeverity": "warning",
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
    "indentation": 2
  }
}
