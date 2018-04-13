import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import withRipple from '@material/react-ripple';

export default class MaterialIcon extends React.Component {
  render() {
    const {
      icon,
      hasRipple,
      ...otherProps
    } = this.props;

    if (hasRipple) {
      return (
        <RippleMaterialIcon
          unbounded
          icon={icon}
          {...otherProps}
        />
      );
    }

    return (
      <MaterialIconDefault
        icon={icon}
        {...otherProps}
      />
    );
  }
}

MaterialIcon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  hasRipple: PropTypes.bool,
};

MaterialIcon.defaultProps = {
  icon: '',
  className: '',
  hasRipple: false,
};


const MaterialIconDefault = (props) => {
  const {
    className,
    icon,
    initRipple,
    unbounded,
    ...otherProps
  } = props;
  const classes = classnames('material-icons', {
    [className]: className.length > 0,
  });

  return (
    <i
      className={classes}
      ref={initRipple}
      {...otherProps}
    >
      {icon}
    </i>
  );
}

const RippleMaterialIcon = withRipple(MaterialIconDefault);
