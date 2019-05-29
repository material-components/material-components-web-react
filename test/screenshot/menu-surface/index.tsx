import React from 'react';
import '../../../packages/menu-surface/index.scss';
import '@material/list/mdc-list.scss';
import './index.scss';
import MenuSurface, {Corner} from '../../../packages/menu-surface/index';
import Button from '../../../packages/button/index';

type MenuSurfaceButtonProps = {
  contextmenu: boolean;
  open: boolean;
  anchorCorner?: Corner;
  anchorMargin?: object;
};

type MenuSurfaceButtonState = {
  open: boolean;
  coordinates?: {x: number; y: number};
  anchorElement: HTMLElement;
};

class MenuSurfaceButton extends React.Component<
  MenuSurfaceButtonProps,
  MenuSurfaceButtonState
> {
  rightClickCallback_: React.MouseEventHandler = (event: React.MouseEvent) => {
    this.setState({
      open: true,
      coordinates: {x: event.clientX, y: event.clientY},
    });
    event.preventDefault();
  };

  constructor(props: MenuSurfaceButtonProps) {
    super(props);
    this.state = {
      open: props.open,
    } as MenuSurfaceButtonState;
  }

  static defaultProps = {
    contextmenu: false,
    open: false,
  };

  componentDidMount() {
    if (this.props.contextmenu) {
      // @ts-ignore
      window.addEventListener('contextmenu', this.rightClickCallback_);
    }
  }

  componentWillUnmount() {
    // @ts-ignore
    window.removeEventListener('contextmenu', this.rightClickCallback_);
  }

  setAnchorElement = (element: HTMLElement) => {
    const {anchorElement} = this.state;
    if (anchorElement) {
      return;
    }
    this.setState({anchorElement: element});
  };

  render() {
    const {anchorCorner, anchorMargin, contextmenu} = this.props;
    const {coordinates, open, anchorElement} = this.state;
    return (
      <span
        className={'menu-surface-button mdc-menu-surface--anchor'}
        ref={this.setAnchorElement}
      >
        {contextmenu ? null : this.renderButton()}
        <MenuSurface
          open={open}
          anchorMargin={anchorMargin}
          anchorCorner={anchorCorner}
          onClose={() => this.setState({open: false, coordinates: undefined})}
          anchorElement={coordinates ? undefined : anchorElement}
          coordinates={coordinates}
        >
          <ul className='mdc-list' role='menu'>
            {['Back', 'Forward', 'Reload'].map((text, index) =>
              this.renderListItem(text, index)
            )}
            <li className='mdc-list-divider' role='separator' />
            {['Help & Feedback', 'Settings'].map((text, index) =>
              this.renderListItem(text, index)
            )}
          </ul>
        </MenuSurface>
      </span>
    );
  }

  renderListItem(text: string, index: number) {
    return (
      <li key={index} className='mdc-list-item' role='menuitem'>
        <span className='mdc-list-item__text'>{text}</span>
      </li>
    );
  }

  renderButton() {
    return (
      <Button raised onClick={() => this.setState({open: true})}>
        Open Menu
      </Button>
    );
  }
}

const MenuSurfaceScreenshotTest = () => {
  return (
    <div className='menu-surface-screenshot-test'>
      <MenuSurfaceButton open anchorCorner={Corner.BOTTOM_LEFT} />
      <MenuSurfaceButton contextmenu />
    </div>
  );
};

export default MenuSurfaceScreenshotTest;
