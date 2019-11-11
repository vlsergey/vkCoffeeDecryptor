/* eslint-env node */
const imported = require( '@vlsergey/babel-config' );
module.exports = api => {
  const original = imported( api );
  return {
    ...original,
    plugins: [
      ...original.plugins,
      "emotion"
    ]
  };
};
