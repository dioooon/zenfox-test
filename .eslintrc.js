module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
  },
  extends: [
    "plugin:vue/essential",
    "standard"
  ],
  plugins: [
    "vue"
  ],
  rules: {
    "arrow-parens": 0,
    "no-unused-expressions": 0,
    "generator-star-spacing": 0,
    "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
