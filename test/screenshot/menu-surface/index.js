import React from 'react';

import '../../../packages/menu-surface/index.scss';
import '@material/list/mdc-list.scss';
import './index.scss';

import MenuSurface, {Corner} from '../../../packages/menu-surface/index';
import Button from '../../../packages/button/index';

class MenuSurfaceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, // eslint-disable-line react/prop-types
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

    setTimeout(() => {
      if (this.props.open) {
        this.setState({open: true});
      }
    }, 10)

    if (this.props.contextmenu) { // eslint-disable-line react/prop-types
      window.addEventListener('contextmenu', this.rightClickCallback_);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('contextmenu', this.rightClickCallback_);
  }

  setAnchorElement = (element) => {
    const {anchorElement} = this.state;
    if (anchorElement) {
      return;
    }
    this.setState({anchorElement: element});
  }

  render() {
    const {
      anchorCorner, anchorMargin, className, contextmenu, // eslint-disable-line react/prop-types
    } = this.props;
    const {coordinates, open, anchorElement} = this.state;
    return (
      <div
        className={`${className} menu-surface-button mdc-menu-surface--anchor`}
        ref={this.setAnchorElement}
      >
        {contextmenu ? null : this.renderButton()}
        <MenuSurface
          open={open}
          anchorMargin={anchorMargin}
          anchorCorner={anchorCorner}
          onClose={() => this.setState({open: false, coordinates: null})}
          anchorElement={coordinates ? null : anchorElement}
          coordinates={coordinates}
        >
          <ul className='mdc-list' role='menu'>
            {['Back', 'Forward', 'Reload'].map((text, index) => (
              this.renderListItem(text, index)
            ))}
            <li className='mdc-list-divider' role='separator'></li>
            {['Help & Feedback', 'Settings'].map((text, index) => (
              this.renderListItem(text, index)
            ))}
          </ul>
        </MenuSurface>
      </div>
    );
  }

  renderListItem(text, index) {
    return (
      <li key={index} className='mdc-list-item' role='menuitem'>
        <button><span className='mdc-list-item__text'>
          {text}
        </span></button>
      </li>
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
    <div className='menu-surface-screenshot-test'>
      <MenuSurfaceButton open
        anchorCorner={Corner.TOP_RIGHT}
        className='menu-surface--top-right'
      />
      <MenuSurfaceButton open
        anchorMargin={{left: 40}}
        anchorCorner={Corner.BOTTOM_RIGHT}
        className='menu-surface--bottom-right'
      />
      <MenuSurfaceButton open
        anchorCorner={Corner.TOP_START}
        className='menu-surface--top-start'
      />
      <MenuSurfaceButton open
        anchorCorner={Corner.BOTTOM_START}
        className='menu-surface--bottom-start'
      />
      <MenuSurfaceButton contextmenu />
    </div>
  );
};
export default MenuSurfaceScreenshotTest;
