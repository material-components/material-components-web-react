
import {assert} from 'chai';

import TemporaryClass from '../../../packages/temporary-package';

suite('TemporaryClass');

test('#returnOne returns 1', () => {
  const temp = new TemporaryClass();
  assert.equal(1, temp.returnOne());
});
