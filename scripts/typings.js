const react2dts = require('react-to-typescript-definitions');

const x = react2dts.generateFromFile('card', './packages/card/index.js', {'topLevelModule': true})
console.log(x)
