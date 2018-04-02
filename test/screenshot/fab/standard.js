import React from 'react';
import ReactDOM from 'react-dom';
import Fab from '../../../packages/fab';

import '../../../packages/fab/index.scss';
import './index.scss';

ReactDOM.render((
    <div>
      <Fab className="demo-button"><i className="material-icons">favorite</i></Fab>
      <Fab className="demo-button"><span className="material-icons">directions_transit</span></Fab>
      <Fab className="demo-button"><a className="material-icons">add</a></Fab>
      <Fab mini className="demo-button"><i className="material-icons">favorite</i></Fab>
      <Fab mini className="demo-button"><span className="material-icons">directions_transit</span></Fab>
      <Fab mini className="demo-button"><a className="material-icons">add</a></Fab>
      <Fab className="demo-ink-color demo-button"><i className="material-icons">favorite</i></Fab>
      <Fab className="demo-ink-color demo-button"><span className="material-icons">directions_transit</span></Fab>
      <Fab className="demo-ink-color demo-button"><a className="material-icons">add</a></Fab>
      <Fab mini className="demo-ink-color demo-button"><i className="material-icons">favorite</i></Fab>
      <Fab mini className="demo-ink-color demo-button"><span className="material-icons">directions_transit</span></Fab>
      <Fab mini className="demo-ink-color demo-button"><a className="material-icons">add</a></Fab>
      <Fab className="demo-fill-color demo-button"><i className="material-icons">favorite</i></Fab>
      <Fab className="demo-fill-color demo-button"><span className="material-icons">directions_transit</span></Fab>
      <Fab className="demo-fill-color demo-button"><a className="material-icons">add</a></Fab>
      <Fab mini className="demo-fill-color demo-button"><i className="material-icons">favorite</i></Fab>
      <Fab mini className="demo-fill-color demo-button"><span className="material-icons">directions_transit</span></Fab>
      <Fab mini className="demo-fill-color demo-button"><a className="material-icons">add</a></Fab>
    </div>
), document.getElementById('app'));
