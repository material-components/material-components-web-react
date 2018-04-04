import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {cssClasses} from './constants';

const asNavIcon = (WrappedComponent) => {
  class NavIconComponent extends React.Component {
    render() {
      const {
        className: navIconClasses,
        ...otherProps
      } = this.props;
      const className = classnames(cssClasses.NAV_ICON, {
        [navIconClasses]: navIconClasses.length > 0,
      });

      const updatedProps = Object.assign({
        className,
      },
      otherProps);

      return <WrappedComponent {...updatedProps} />;
    }
  }

  NavIconComponent.propTypes = {
    className: PropTypes.string,
  };

  NavIconComponent.defaultProps = {
    className: '',
  };

  return NavIconComponent;
};

export default asNavIcon;
