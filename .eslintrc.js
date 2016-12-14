module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // 2个空格缩进
    'indent': ["error", 2],
    // 禁止函数名前的空格
    'space-before-function-paren': ["error", "never"],
    // 不检查函数的未定义调用
    'no-undef': 0,
    // 大括号不换行，关键字换行
    'brace-style': ["error", "stroustrup"],
    // 数组括号内两端不留空格
    'array-bracket-spacing': ["error", "never"],
    // 禁止对象或数组最后一个元素带有逗号
    'comma-dangle': ["error", "never"],
    // 禁止逗号前空格，逗号后必须空格
    'comma-spacing': ["error", { "before": false, "after": true }],
    // 禁止逗号另起一行
    'comma-style': ["error", "last"],
    // 文件末尾空行
    'eol-last': 2,
    // 必须使用===
    'eqeqeq': ["error", "allow-null"],
    // 禁止冒号前空格，冒号后必须空格
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    // 禁止switch语句没有跳出
    "no-fallthrough": 2,
    // 禁止连续空格
    "no-multi-spaces": 2,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
