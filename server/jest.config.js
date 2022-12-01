export default {
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|mjs?|ts?)$",
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.mjs$": "babel-jest",
    },
    testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
    moduleFileExtensions: ["js", "jsx", "mjs"]
  }

  // transform: {
  //   "^.+\\.jsx?$": "babel-jest",
  //   "^.+\\.mjs$": "babel-jest",
  // },