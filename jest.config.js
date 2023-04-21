const config = {
  verbose: true,
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!lit-html)",
  ],
  collectCoverage: true,
  "moduleNameMapper": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testEnvironment: 'jsdom',
  moduleDirectories: ["node_modules", "src"],
};

process.env = Object.assign(process.env, {
  JWT_SECRET: 'secretValue',
});

module.exports = config;