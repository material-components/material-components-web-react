import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {cssClasses} from './constants';

const asActionItem = (WrappedComponent) => {
  class ActionItemComponent extends React.Component {
    render() {
      const {
        className: actionItemClasses,
        ...otherProps
      } = this.props;
      const className = classnames(cssClasses.ACTION_ITEM, {
        [actionItemClasses]: actionItemClasses.length > 0,
      });

      const updatedProps = Object.assign({
        className,
      },
      otherProps);

      return <WrappedComponent {...updatedProps} />;
    }
  }

  ActionItemComponent.propTypes = {
    className: PropTypes.string,
  };

  ActionItemComponent.defaultProps = {
    className: '',
  };

  return ActionItemComponent;
};

export default asActionItem;
