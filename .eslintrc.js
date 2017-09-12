module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "plugins": [
    "eslint-plugin-react",
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
      "es6": true,
    },
    "sourceType": "module",
  },
  "rules": {
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "react/jsx-uses-vars": 1,
  },
};
