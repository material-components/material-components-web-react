import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Content extends React.Component {

  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    const classes = classnames('mdc-card__primary-action', className);

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

Content.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Content.defaultProps = {
  className: '',
  children: null,
};
