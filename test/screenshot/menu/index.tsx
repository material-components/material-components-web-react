import * as React from 'react';
import '../../../packages/menu/index.scss';
import Menu, {
  MenuList,
  MenuListItem,
  MenuListItemText,
} from '../../../packages/menu/index';

interface MenuState {
  coordinates?: {x: number; y: number};
  open: boolean;
}

class MenuScreenshotTest extends React.Component<{}, MenuState> {
  state = {
    open: true,
    coordinates: undefined,
  };

  componentDidMount() {
    // @ts-ignore
    window.addEventListener('contextmenu', this.rightClickCallback);
  }

  componentWillUnmount() {
    // @ts-ignore
    window.removeEventListener('contextmenu', this.rightClickCallback);
  }

  private rightClickCallback: React.MouseEventHandler = (
    event: React.MouseEvent
  ) => {
    this.setState({
      open: !this.state.open,
      coordinates: {x: event.clientX, y: event.clientY},
    });
    event.preventDefault();
  };
  private onClose = () => {
    this.setState({open: false});
  };

  render() {
    const menuOptions = ['Save', 'Edit', 'Cut', 'Copy', 'Paste'];

    return (
      <Menu
        open={this.state.open}
        onClose={this.onClose}
        coordinates={this.state.coordinates}
        onSelected={(index: number, item: Element) => console.log(index, item)}
      >
        <MenuList>
          {menuOptions.map((option, index) => (
            <MenuListItem key={index}>
              <MenuListItemText primaryText={option} />
            </MenuListItem>
          ))}
        </MenuList>
      </Menu>
    );
  }
}

export default MenuScreenshotTest;
