import React from 'react';
import DrawerTest from './DrawerTest';

interface PermanentToModalDrawerScreenshotTestState {
  isPhone: boolean;
}

class PermanentToModalDrawerScreenshotTest extends React.Component<
  {},
  PermanentToModalDrawerScreenshotTestState
> {
  state = {
    isPhone: window.innerWidth < 599,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDrawerVariant);
  }

  shouldComponentUpdate(
    _: {},
    nextState: PermanentToModalDrawerScreenshotTestState
  ) {
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
  };

  render() {
    if (this.state.isPhone) {
      return <DrawerTest open={false} modal title='Modal Drawer' />;
    }
    return <DrawerTest hideNavigationIcon title='Permanent Drawer' />;
  }
}

export default PermanentToModalDrawerScreenshotTest;
