import {assert} from 'chai';
import {isElementRtl} from '../../../packages/bidirection';

suite('Bidirection');

test('#isElementRtl returns true if parent element has attribute dir="rtl"', () => {
  const div = document.createElement('div');
  document.body.style.direction = 'rtl';
  document.body.append(div);
  assert.isTrue(isElementRtl(div));
  document.body.style.direction = 'initial';
  div.remove();
});

test('#isElementRtl returns false if parent element does not has attribute dir="rtl"', () => {
  const div = document.createElement('div');
  document.body.append(div);
  assert.isFalse(isElementRtl(div));
  div.remove();
});
