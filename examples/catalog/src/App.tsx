import './Reset.scss';

import React from 'react';
import {render} from 'react-dom';
import Fab from '@material/react-fab';
import MaterialIcon from '@material/react-material-icon';
import {Snackbar} from '@material/react-snackbar';

import {MenuContext, UserContext} from './Context';
import {Menu} from './menu/Menu';
import {TopBar} from './top-bar/TopBar';
import {Content} from './content/Content';

class App extends React.Component {
  state = {
    menu: {
      isOpen: false,
      selectedIndex: 0,
    },
  };

  setOpen = (isOpen: boolean) => {
    const menu = this.state.menu;
    this.setState({
      menu: {
        ...menu,
        isOpen: menu.isOpen = isOpen,
      },
    });
  };

  setSelectedIndex = (selectedIndex: number) => {
    const menu = this.state.menu;
    this.setState({
      menu: {
        ...menu,
        selectedIndex: menu.selectedIndex = selectedIndex,
      },
    });
  };

  render() {
    const {isOpen, selectedIndex} = this.state.menu;

    return (
      <MenuContext.Provider
        value={{
          isOpen: isOpen,
          selectedIndex: selectedIndex,
          setOpen: this.setOpen,
          setSelectedIndex: this.setSelectedIndex,
        }}
      >
        <UserContext.Provider
          value={{
            name: 'Troy Tae',
            account: 'tjy970721@gmail.com',
          }}
        >
          <Menu />
          <TopBar />
          <Content />
          <Snackbar
            timeoutMs={10000}
            message='You became a frogrammer!'
            actionText='dismiss'
          />
          <a
            rel='noopener noreferrer'
            target='_blank'
            href='https://github.com/TroyTae/material-components-web-react-example/issues'
            style={{
              position: 'fixed',
              right: '20px',
              bottom: '30px',
            }}
          >
            <Fab icon={<MaterialIcon icon='bug_report' />} />
          </a>
        </UserContext.Provider>
      </MenuContext.Provider>
    );
  }
}

render(<App />, document.getElementById('app'));
