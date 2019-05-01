import React from 'react';
import MaterialIcon from '../../../packages/material-icon/index';
import '../../../packages/icon-button/index.scss';
import './index.scss';
import IconButton, {IconToggle} from '../../../packages/icon-button/index';

class IconButtonTest extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <IconButton>
          <MaterialIcon icon='favorite' />
        </IconButton>

        <span className='demo-custom-color'>
          <IconButton>
            <MaterialIcon icon='favorite' />
          </IconButton>
        </span>

        <IconButton isLink>
          <MaterialIcon icon='favorite' />
        </IconButton>
        <IconButton disabled>
          <MaterialIcon icon='favorite' />
        </IconButton>

        <IconButton>
          <IconToggle>
            <MaterialIcon icon='favorite_border' />
          </IconToggle>
          <IconToggle isOn>
            <MaterialIcon icon='favorite' />
          </IconToggle>
        </IconButton>
      </div>
    );
  }
}
export default IconButtonTest;
