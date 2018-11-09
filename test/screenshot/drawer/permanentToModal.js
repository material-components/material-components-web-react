import React from 'react';
import DrawerTest from './DrawerTest';

class PermanentToModalDrawerScreenshotTest extends React.Component {

  state = {
    isPhone: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDrawerVariant);
  }

  componentDidUnmount() {
    window.removeEventListener('resize', this.updateDrawerVariant);
  }

  updateDrawerVariant = () => {
    if (window.innerWidth < 599) {
      this.setState({isPhone: true});
    } else {
      this.setState({isPhone: false});
    }
  }

  render() {
    console.log(this.state.isPhone)
    return <DrawerTest hideNavigationIcon title='Permanent Drawer' />;
  }
};

export default PermanentToModalDrawerScreenshotTest;
