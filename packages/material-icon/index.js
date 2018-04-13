import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import withRipple from '@material/react-ripple';

export default class MaterialIcon extends React.Component {
  render() {
    const {
      icon,
      className,
      hasRipple,
      initRipple,
      unbounded,
      ...otherProps
    } = this.props;
    const classes = classnames('material-icons', {
      [className]: className.length > 0,
    });

    if (hasRipple) {
      return (
        <RippleMaterialIcon
          classes={classes}
          icon={icon}
          initIcon={initRipple}
          {...otherProps}
        />
      );
    }

    return (
      <MaterialIconDefault
        classes={classes}
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
    classes,
    icon,
    initIcon = () => {},
    ...otherProps
  } = props;

  return (
    <i
      className={classes}
      ref={initIcon}
      {...otherProps}
    >
      {icon}
    </i>
  );
}

const RippleMaterialIcon = withRipple(MaterialIconDefault);
