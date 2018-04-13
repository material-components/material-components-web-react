import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Media extends React.Component {
  getStyles = () => {
    const {imageUrl: backgroundUrl, style} = this.props;
    return Object.assign({}, {backgroundUrl}, style);
  }

  render() {
    const {
      className,
      children,
      imageUrl,
      square,
      wide,
      ...otherProps
    } = this.props;
    const classes = classnames('mdc-card__media', className, {
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

Media.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  square: PropTypes.bool,
  wide: PropTypes.bool,
};

Media.defaultProps = {
  className: '',
  children: null,
  square: false,
  wide: false,
};
