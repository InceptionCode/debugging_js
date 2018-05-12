const OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true
    },
    extends: 'eslint:recommended',
    // required to lint *.vue files
    plugins: [
        "mocha"
    ],
    // add your custom rules here
    rules: {
        semi: ["error", "always"],
        'space-before-function-paren': OFF,
        'no-debugger': OFF,
        indent: [2, 2, {"VariableDeclarator": {"var": 2, "let": 2, "const": 3},"SwitchCase":1}],
        'one-var': 0,
        "getter-return": ERROR,
        quotes: [ERROR, 'single'],
        "no-unused-vars": [ERROR, { "vars": "local", "args": "after-used", "ignoreRestSiblings": false }],
        "no-console": WARN,
        "arrow-spacing":  [ERROR, { "before": true, "after": true }]
    },
    globals: {
        "$": true, // Global nav needs jQuery for dev only
        "jQuery": true,
        "require": true
    }
}
