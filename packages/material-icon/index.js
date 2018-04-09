import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class MaterialIcon extends React.Component {
  render() {
    const {
      icon,
      className,
      ...otherProps
    } = this.props;
    const classes = classnames('material-icons', {
      [className]: className.length > 0,
    });

    return (
      <i
        className={classes}
        {...otherProps}
      >
        {icon}
      </i>
    );
  }
}

MaterialIcon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
};

MaterialIcon.defaultProps = {
  icon: '',
  className: '',
};
