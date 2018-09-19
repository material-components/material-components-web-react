import React from 'react';

import '../../../packages/menu-surface/index.scss';
import '@material/list/mdc-list.scss';
import './index.scss';

import MenuSurface from '../../../packages/menu-surface/index';
import Button from '../../../packages/button/index';

const renderListItem = (text, index) => {
  return (
    <li key={index} className='mdc-list-item' role='menuitem'>
      <span className='mdc-list-item__text'>
        {text}
      </span>
    </li>
  );
}
class MenuSurfaceScreenshotTest extends React.Component {
  anchorElement = React.createRef();
  state = {
    open: false,
    coordinates: null,
  };

  componentDidMount() {
    this.rightClickCallback_ = (evt) => {
      this.setState({
        open: true,
        coordinates: {x: evt.clientX, y: evt.clientY},
      });
      evt.preventDefault();
      // return false;
    };

    window.addEventListener('contextmenu', this.rightClickCallback_);
  }

  componentWillUnmount() {
    window.removeEventListener('contextmenu', this.rightClickCallback_);
  }

  render() {
    const {coordinates, open} = this.state;
    return (
      <div
        className='menu-surface-screenshot-test mdc-menu-surface--anchor'
        ref={this.anchorElement}
      >
        <Button
          raised
          onClick={() => this.setState({open: true})}
        >
          Open Menu
        </Button>

        <MenuSurface
          open={open}
          onClose={() => this.setState({open: false, coordinates: null})}
          anchorElement={coordinates ? null : this.anchorElement.current}
          coordinates={coordinates}
        >
          <ul className='mdc-list' role='menu'>
            {['Back', 'Forward', 'Reload'].map((text, index) => (
              renderListItem(text, index)
            ))}
            <li className='mdc-list-divider' role='separator'></li>
            {['Help &amp; Feedback', 'Settings'].map((text, index) => (
              renderListItem(text, index)
            ))}
          </ul>
        </MenuSurface>
      </div>
    );
  }
};

export default MenuSurfaceScreenshotTest;
