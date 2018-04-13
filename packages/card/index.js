import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ActionButtons from './ActionButtons';
import ActionIcons from './ActionIcons';
import Actions from './Actions';
import Content from './Content';
import Media from './Media';

export default class Card extends React.Component {
  render() {
    const {
      className,
      children,
      stroked,
      ...otherProps
    } = this.props;
    const classes = classnames('mdc-card', className, {
      'mdc-card--stroked': stroked,
    });

    return (
      <div
        className={classes}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}

Card.propTypes = {
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};


export {
  ActionButtons as CardActionButtons,
  ActionIcons as CardActionIcons,
  Actions as CardActions,
  Content as CardContent,
  Media as CardMedia,
};
