import * as React from 'react';
import TopAppBar from '../../../packages/top-app-bar';
import MaterialIcon from '../../../packages/material-icon';
import MainTopAppBarContent from './mainContent';

interface TopAppBarProminentToShortCollapsedScreenshotTestState {
  isPhone: boolean;
}

class TopAppBarProminentToShortCollapsedScreenshotTest extends React.Component<
  {},
  TopAppBarProminentToShortCollapsedScreenshotTestState
  > {
  state = {
    isPhone: window.innerWidth < 599,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateTopAppBarVariant);
  }

  shouldComponentUpdate(_: {}, nextState: TopAppBarProminentToShortCollapsedScreenshotTestState) {
    return nextState.isPhone !== this.state.isPhone;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTopAppBarVariant);
  }

  updateTopAppBarVariant = () => {
    const isPhone = window.innerWidth < 599;
    this.setState({isPhone});
  };

  render() {
    if (this.state.isPhone) {
      return (
        <div>
          <TopAppBar
            shortCollapsed
            navigationIcon={
              <MaterialIcon icon='menu' onClick={() => console.log('click')} />
            }
          />
          <MainTopAppBarContent />
        </div>
      );
    }

    return (
      <div>
        <TopAppBar
          prominent
          title={'Annie, I\'m a Hawk'}
          navigationIcon={
            <MaterialIcon icon='menu' onClick={() => console.log('click')} />
          }
        />
        <MainTopAppBarContent />
      </div>
    );
  }
}

export default TopAppBarProminentToShortCollapsedScreenshotTest;
