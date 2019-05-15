import React from 'react';
import Fab from '../../../packages/fab/index';
import '../../../packages/fab/index.scss';
import './index.scss';
import MaterialIcon from '../../../packages/material-icon';

class FabScreenshotTest extends React.Component<{}, {isHidden: boolean}> {
  state = {isHidden: false};

  render() {
    return (
      <div>
        <Fab
          className='demo-button'
          icon={<i className='material-icons'>favorite</i>}
        />
        <Fab
          className='demo-button'
          icon={<i className='material-icons'>favorite</i>}
          textLabel='Favorite'
        />
        <Fab
          className='demo-button'
          icon={<i className='material-icons'>directions_transit</i>}
        />
        <Fab className='demo-button' icon={<MaterialIcon icon='add' />} />
        <Fab
          className='demo-button'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='material-icons'
              viewBox='0 0 24 24'
              fill='#000000'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                d='M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11 11 11-4.93 11-11zM5 17.64C3.75 16.1 3 14.14 3
             12c0-2.13.76-4.08 2-5.63v11.27zM17.64 5H6.36C7.9 3.75 9.86 3 12 3s4.1.75 5.64 2zM12 14.53L8.24 7h7.53L12
             14.53zM17 9v8h-4l4-8zm-6 8H7V9l4 8zm6.64 2c-1.55 1.25-3.51 2-5.64 2s-4.1-.75-5.64-2h11.28zM21 12c0 2.14-.75
              4.1-2 5.64V6.37c1.24 1.55 2 3.5 2 5.63z'
              />
            </svg>
          }
        />
        <Fab
          className='demo-button'
          icon={
            <img className='material-icons' src='/images/ic_button_24px.svg' />
          }
        />
        <Fab
          mini
          className='demo-button'
          icon={<i className='material-icons'>favorite</i>}
        />
        <Fab
          mini
          className='demo-button'
          icon={<span className='material-icons'>directions_transit</span>}
        />
        <Fab mini className='demo-button' icon={<MaterialIcon icon='add' />} />
        <Fab
          mini
          className='demo-button'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='material-icons'
              viewBox='0 0 24 24'
              fill='#000000'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                d='M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11 11 11-4.93 11-11zM5 17.64C3.75 16.1 3 14.14 3
             12c0-2.13.76-4.08 2-5.63v11.27zM17.64 5H6.36C7.9 3.75 9.86 3 12 3s4.1.75 5.64 2zM12 14.53L8.24 7h7.53L12
             14.53zM17 9v8h-4l4-8zm-6 8H7V9l4 8zm6.64 2c-1.55 1.25-3.51 2-5.64 2s-4.1-.75-5.64-2h11.28zM21 12c0 2.14-.75
              4.1-2 5.64V6.37c1.24 1.55 2 3.5 2 5.63z'
              />
            </svg>
          }
        />
        <Fab
          mini
          className='demo-button'
          icon={
            <img className='material-icons' src='/images/ic_button_24px.svg' />
          }
        />
        <Fab
          className='demo-ink-color demo-button'
          icon={<i className='material-icons'>favorite</i>}
        />
        <Fab
          className='demo-ink-color demo-button'
          icon={<span className='material-icons'>directions_transit</span>}
        />
        <Fab
          className='demo-ink-color demo-button'
          icon={<MaterialIcon icon='add' />}
        />
        <Fab
          className='demo-ink-color demo-button'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='material-icons'
              viewBox='0 0 24 24'
              fill='#000000'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                d='M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11 11 11-4.93 11-11zM5 17.64C3.75 16.1 3 14.14 3
             12c0-2.13.76-4.08 2-5.63v11.27zM17.64 5H6.36C7.9 3.75 9.86 3 12 3s4.1.75 5.64 2zM12 14.53L8.24 7h7.53L12
             14.53zM17 9v8h-4l4-8zm-6 8H7V9l4 8zm6.64 2c-1.55 1.25-3.51 2-5.64 2s-4.1-.75-5.64-2h11.28zM21 12c0 2.14-.75
              4.1-2 5.64V6.37c1.24 1.55 2 3.5 2 5.63z'
              />
            </svg>
          }
        />
        <Fab
          className='demo-ink-color demo-button'
          icon={
            <img className='material-icons' src='/images/ic_button_24px.svg' />
          }
        />
        <Fab
          mini
          className='demo-ink-color demo-button'
          icon={<i className='material-icons'>favorite</i>}
        />
        <Fab
          mini
          className='demo-ink-color demo-button'
          icon={<span className='material-icons'>directions_transit</span>}
        />
        <Fab
          mini
          className='demo-ink-color demo-button'
          icon={<MaterialIcon icon='add' />}
        />
        <Fab
          mini
          className='demo-ink-color demo-button'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='material-icons'
              viewBox='0 0 24 24'
              fill='#000000'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                d='M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11 11 11-4.93 11-11zM5 17.64C3.75 16.1 3 14.14 3
             12c0-2.13.76-4.08 2-5.63v11.27zM17.64 5H6.36C7.9 3.75 9.86 3 12 3s4.1.75 5.64 2zM12 14.53L8.24 7h7.53L12
             14.53zM17 9v8h-4l4-8zm-6 8H7V9l4 8zm6.64 2c-1.55 1.25-3.51 2-5.64 2s-4.1-.75-5.64-2h11.28zM21 12c0 2.14-.75
              4.1-2 5.64V6.37c1.24 1.55 2 3.5 2 5.63z'
              />
            </svg>
          }
        />
        <Fab
          mini
          className='demo-ink-color demo-button'
          icon={
            <img className='material-icons' src='/images/ic_button_24px.svg' />
          }
        />
        <Fab
          className='demo-fill-color demo-button'
          icon={<i className='material-icons'>favorite</i>}
        />
        <Fab
          className='demo-fill-color demo-button'
          icon={<span className='material-icons'>directions_transit</span>}
        />
        <Fab
          className='demo-fill-color demo-button'
          icon={<MaterialIcon icon='add' />}
        />
        <Fab
          className='demo-fill-color demo-button'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='material-icons'
              viewBox='0 0 24 24'
              fill='#000000'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                d='M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11 11 11-4.93 11-11zM5 17.64C3.75 16.1 3 14.14 3
             12c0-2.13.76-4.08 2-5.63v11.27zM17.64 5H6.36C7.9 3.75 9.86 3 12 3s4.1.75 5.64 2zM12 14.53L8.24 7h7.53L12
             14.53zM17 9v8h-4l4-8zm-6 8H7V9l4 8zm6.64 2c-1.55 1.25-3.51 2-5.64 2s-4.1-.75-5.64-2h11.28zM21 12c0 2.14-.75
              4.1-2 5.64V6.37c1.24 1.55 2 3.5 2 5.63z'
              />
            </svg>
          }
        />
        <Fab
          className='demo-fill-color demo-button'
          icon={
            <img className='material-icons' src='/images/ic_button_24px.svg' />
          }
        />
        <Fab
          mini
          className='demo-fill-color demo-button'
          icon={<i className='material-icons'>favorite</i>}
        />
        <Fab
          mini
          className='demo-fill-color demo-button'
          icon={<span className='material-icons'>directions_transit</span>}
        />
        <Fab
          mini
          className='demo-fill-color demo-button'
          icon={<MaterialIcon icon='add' />}
        />
        <Fab
          mini
          className='demo-fill-color demo-button'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='material-icons'
              viewBox='0 0 24 24'
              fill='#000000'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                d='M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11 11 11-4.93 11-11zM5 17.64C3.75 16.1 3 14.14 3
             12c0-2.13.76-4.08 2-5.63v11.27zM17.64 5H6.36C7.9 3.75 9.86 3 12 3s4.1.75 5.64 2zM12 14.53L8.24 7h7.53L12
             14.53zM17 9v8h-4l4-8zm-6 8H7V9l4 8zm6.64 2c-1.55 1.25-3.51 2-5.64 2s-4.1-.75-5.64-2h11.28zM21 12c0 2.14-.75
              4.1-2 5.64V6.37c1.24 1.55 2 3.5 2 5.63z'
              />
            </svg>
          }
        />
        <Fab
          mini
          className='demo-fill-color demo-button'
          icon={
            <img className='material-icons' src='/images/ic_button_24px.svg' />
          }
        />
        <Fab
          exited={this.state.isHidden}
          onClick={() => this.setState({isHidden: true})}
          textLabel='Hide With Click'
          icon={<MaterialIcon icon='cancel' />}
          title='test'
        />
        <Fab
          exited={!this.state.isHidden}
          mini
          icon={<MaterialIcon icon='favorite' />}
          onClick={() => this.setState({isHidden: false})}
        />
      </div>
    );
  }
}

export default FabScreenshotTest;
