import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {cssClasses} from '../../../packages/top-app-bar/constants';
import asNavIcon from '../../../packages/top-app-bar/asNavIcon';

suite('asNavIcon HOC');

test(`asNavIcon adds ${cssClasses.NAV_ICON} class`, () => {
  class CustomComponent extends React.Component {
    render() {
      const {className} = this.props; // eslint-disable-line react/prop-types
      return <i className={`${className} material-icons`}>bookmark</i>;
    }
  }
  const EnhancedNavIcon = asNavIcon(CustomComponent);
  const wrapper = shallow(<EnhancedNavIcon />);
  assert.isTrue(wrapper.dive().hasClass('material-icons'));
  assert.isTrue(wrapper.dive().hasClass(cssClasses.NAV_ICON));
});
