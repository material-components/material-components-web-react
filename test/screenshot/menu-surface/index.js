import React from 'react';

import '../../../packages/menu-surface/index.scss';
import '@material/list/mdc-list.scss';
import './index.scss';

import MenuSurface, {Corner} from '../../../packages/menu-surface/index';
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

class MenuSurfaceButton extends React.Component {
  anchorElement = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      coordinates: null,
    };
  }

  componentDidMount() {
    this.rightClickCallback_ = (evt) => {
      this.setState({
        open: true,
        coordinates: {x: evt.clientX, y: evt.clientY},
      });
      evt.preventDefault();
    };

    if (this.anchorElement.current) {
      this.forceUpdate();
    }

    if (this.props.contextmenu) {
      window.addEventListener('contextmenu', this.rightClickCallback_);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('contextmenu', this.rightClickCallback_);
  }

  render() {
    const {anchorCorner, className, contextmenu} = this.props;
    const {coordinates, open} = this.state;
    return (
      <div>
        <div
          className={`${className} menu-surface-button mdc-menu-surface--anchor`}
          ref={this.anchorElement}
        >
          {contextmenu ? null : this.renderButton()}
          <MenuSurface
            open={open}
            anchorCorner={anchorCorner}
            onClose={() => this.setState({open: false, coordinates: null})}
            anchorElement={coordinates ? null : this.anchorElement.current}
            coordinates={coordinates}
          >
            <ul className='mdc-list' role='menu'>
              {['Back', 'Forward', 'Reload'].map((text, index) => (
                renderListItem(text, index)
              ))}
              <li className='mdc-list-divider' role='separator'></li>
              {['Help & Feedback', 'Settings'].map((text, index) => (
                renderListItem(text, index)
              ))}
            </ul>
          </MenuSurface>
        </div>
      </div>
    );
  }

  renderButton() {
    return (
      <Button
        raised
        onClick={() => this.setState({open: true})}
      >
        Open Menu
      </Button>
    );
  }
};

const MenuSurfaceScreenshotTest = () => {
  return (
    <div>
      <MenuSurfaceButton open anchorCorner={Corner.TOP_RIGHT} className='menu-surface--top-right' />
      <MenuSurfaceButton open anchorCorner={Corner.BOTTOM_RIGHT} className='menu-surface--bottom-right' />
      <MenuSurfaceButton open anchorCorner={Corner.TOP_START} className='menu-surface--top-start' />
      <MenuSurfaceButton open anchorCorner={Corner.BOTTOM_START} className='menu-surface--bottom-start' />
      <MenuSurfaceButton contextmenu />
    </div>
  );
}
export default MenuSurfaceScreenshotTest;
