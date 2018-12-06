import * as React from 'react';
import '../../../packages/drawer/index.scss';
import './index.scss';
import MaterialIcon from '../../../packages/material-icon/index';
import DrawerAboveTopAppBar from './DrawerAboveTopAppBar';
import DrawerBelowTopAppBar from './DrawerBelowTopAppBar';

const noop = () => {};

type DrawerScreenshotTestProps = {
  open?: boolean,
  title: string,
  dismissible?: boolean,
  modal?: boolean,
  isBelow?: boolean,
  hideNavigationIcon?: boolean
};

type DrawerScreenshotTestState = {
  open: boolean
};

class DrawerScreenshotTest extends React.Component<
  DrawerScreenshotTestProps,
  DrawerScreenshotTestState
  > {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  onClose = () => this.setState({open: false});

  render() {
    const {open} = this.state;
    const {title, dismissible, modal, isBelow} = this.props; // eslint-disable-line react/prop-types
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
    if (this.props.hideNavigationIcon) return; // eslint-disable-line react/prop-types
    return (
      <MaterialIcon
        tabIndex="0"
        onClick={() => this.setState({open: !this.state.open})}
        onKeyDown={() => this.setState({open: !this.state.open})}
        icon="menu"
      />
    );
  };

  renderLoremIpsum = (_, index) => {
    return (
      <p className="drawer-lorem-ipsum" key={index}>
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
