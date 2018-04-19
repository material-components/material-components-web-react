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
          hasRipple
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

const MaterialIconDefault = (props) => {
  const {
    className,
    icon,
    initRipple,
    hasRipple,
    ...otherProps
  } = props;
  const classes = classnames('material-icons', className, {
    'material-icons--ripple-surface': hasRipple,
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
};

export const RippleMaterialIcon = withRipple(MaterialIconDefault);

MaterialIcon.propTypes = {
  icon: PropTypes.string,
  hasRipple: PropTypes.bool,
};

MaterialIcon.defaultProps = {
  icon: '',
  hasRipple: false,
};

MaterialIconDefault.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  initRipple: PropTypes.func,
  hasRipple: PropTypes.bool,
};

MaterialIconDefault.defaultProps = {
  icon: '',
  className: '',
  initRipple: () => {},
  hasRipple: false,
};
