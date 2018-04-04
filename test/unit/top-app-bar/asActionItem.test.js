import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {cssClasses} from '../../../packages/top-app-bar/constants';
import asActionItem from '../../../packages/top-app-bar/asActionItem';

suite('asActionItem HOC');

test(`asActionItem adds ${cssClasses.ACTION_ITEM} class`, () => {
  class CustomComponent extends React.Component {
    render() {
      const {className} = this.props; // eslint-disable-line react/prop-types
      return <i className={`${className} material-icons`}>bookmark</i>;
    }
  }
  const EnhancedActionItem = asActionItem(CustomComponent);
  const wrapper = shallow(<EnhancedActionItem />);
  assert.isTrue(wrapper.dive().hasClass('material-icons'));
  assert.isTrue(wrapper.dive().hasClass(cssClasses.ACTION_ITEM));
});
