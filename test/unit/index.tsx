import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
// const context = require.context('.', true, /\.test\.(j|t)sx?$/);
// context.keys().forEach(context);
require('./floating-label/index.test.tsx')
