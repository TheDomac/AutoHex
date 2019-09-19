module.exports = {
  "src/**/*": [
    "eslint --fix",
    "prettier --write",
    //   'jest --findRelatedTests',
    "git add",
  ],
};
