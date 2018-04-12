import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  render() {
    const {
      icon,
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
  icon: PropTypes.string,
  className: PropTypes.string,
};

Card.defaultProps = {
  icon: '',
  className: '',
};



/**
CardHeader
  title
  subtitle
  avatar
CardMedia
  image-urlPath
  modifiers: square, 16-9 (wide)
  chilren === __media-content
CardContent
  __primary-action
CardActions
  modifiers: fullBleed
CardButtons
  use material buttons
CardIcons
  use material ICons
