import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Media extends React.Component {
  getStyles = () => {
    const {imageUrl, style} = this.props;
    return Object.assign({}, {
      backgroundImage: `url(${imageUrl})`,
    }, style);
  }

  render() {
    const {
      className,
      children, // eslint-disable-line no-unused-vars
      contentClassName, // eslint-disable-line no-unused-vars
      square,
      imageUrl, // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
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
    const {children, contentClassName} = this.props;
    if (!children) {
      return;
    }

    const classes = classnames('mdc-card__media-content', contentClassName);

    return (
      <div className={classes}>
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
  contentClassName: PropTypes.string,
  imageUrl: PropTypes.string,
  style: PropTypes.object,
};

Media.defaultProps = {
  className: '',
  contentClassName: '',
  children: null,
  square: false,
  wide: false,
  imageUrl: '',
  style: {},
};
