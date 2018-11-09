import React from 'react';
import DrawerTest from './DrawerTest';

class PermanentToModalDrawerScreenshotTest extends React.Component {

  state = {
    isPhone: window.innerWidth < 599,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDrawerVariant);
  }

  shouldComponentUpdate(_, nextState) {
    if (nextState.isPhone === this.state.isPhone) {
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDrawerVariant);
  }

  updateDrawerVariant = () => {
    const isPhone = window.innerWidth < 599;
    this.setState({isPhone});
  }

  render() {
    if (this.state.isPhone) {
      return <DrawerTest open={false} modal title='Modal Drawer' />;
    }
    return <DrawerTest hideNavigationIcon title='Permanent Drawer' />;
  }
};

export default PermanentToModalDrawerScreenshotTest;
