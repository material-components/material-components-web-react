import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  getStyles = () => {
    const {imageUrl: backgroundUrl, style} = this.props;
    return Object.assign({}, {backgroundUrl}, style);
  }

  render() {
    const {
      className,
      children,
      title,
      subtitle,
      avatar,
      ...otherProps
    } = this.props;
    const classes = classnames('mdc-card__media ', className, {
      'mdc-card__media--square': square,
      'mdc-card__media--16-9': wide,
    });

    return (
      <div
        className={classes}
        style={this.getStyles()}
        {...otherProps}
      >
        {this.renderChildren()}
      </div>
    );
  }

  renderChildren() {
    const {children} = this.props;
    // TODO: Check if this check is enough
    if (!children) {
      return;
    }

    return (
      <div className='mdc-card__media-content'>
        {children}
      </div>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  square: PropTypes.bool,
  wide: PropTypes.bool,
};

Header.defaultProps = {
  className: '',
  children: null,
  square: false,
  wide: false,
};



/**
CardHeader
  title
  subtitle
  avatar
CardContent
  __primary-action
CardActions
  modifiers: fullBleed
CardButtons
  use material buttons
CardIcons
  use material ICons
