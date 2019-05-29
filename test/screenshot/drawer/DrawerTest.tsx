import React from 'react';
import '../../../packages/drawer/index.scss';
import './index.scss';
import MaterialIcon from '../../../packages/material-icon/index';
import DrawerAboveTopAppBar from './DrawerAboveTopAppBar';
import DrawerBelowTopAppBar from './DrawerBelowTopAppBar';

const noop = () => undefined;

interface DrawerScreenshotTestProps {
  open?: boolean;
  title: string;
  dismissible?: boolean;
  modal?: boolean;
  isBelow?: boolean;
  hideNavigationIcon?: boolean;
}

interface DrawerScreenshotTestState {
  open: boolean;
}

class DrawerScreenshotTest extends React.Component<
  DrawerScreenshotTestProps,
  DrawerScreenshotTestState
> {
  constructor(props: DrawerScreenshotTestProps) {
    super(props);
    this.state = {
      open: props.open || false,
    };
  }

  onClose = () => this.setState({open: false});

  render() {
    const {open} = this.state;
    const {title, dismissible = false, modal = false, isBelow} = this.props;
    const Tag = isBelow ? DrawerBelowTopAppBar : DrawerAboveTopAppBar;

    return (
      <Tag
        title={title}
        dismissible={dismissible}
        modal={modal}
        open={open}
        onClose={this.onClose}
        renderLoremIpsum={this.renderLoremIpsum}
        renderNavigationIcon={
          dismissible || modal ? this.renderNavigationIcon : noop
        }
      />
    );
  }

  renderNavigationIcon = () => {
    if (this.props.hideNavigationIcon) return;
    return (
      <MaterialIcon
        className='mdc-top-app-bar__navigation-icon'
        tabIndex={0}
        onClick={() => this.setState({open: !this.state.open})}
        onKeyDown={() => this.setState({open: !this.state.open})}
        icon='menu'
        hasRipple
      />
    );
  };

  renderLoremIpsum: (section: number) => JSX.Element = (section: number) => {
    return (
      <p className='drawer-lorem-ipsum' key={section}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        <br />
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        <br />
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        <br />
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in
        <br />
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint
        <br />
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit
        <br />
        anim id est laborum.
      </p>
    );
  };
}
export default DrawerScreenshotTest;
