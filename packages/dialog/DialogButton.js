import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {cssClasses} from './constants';
import Button from '@material/react-button';

const DialogButton = ({action, className, children, isDefault, ...otherProps}) => (
  <Button
    className={classnames(className, cssClasses.BUTTON, {
      [cssClasses.DEFAULT_BUTTON]: isDefault})}
    data-mdc-dialog-action={action}
    {...otherProps}
  >{children}</Button>
);

DialogButton.propTypes = {
  action: PropTypes.string.isRequired,
  className: PropTypes.string,
  isDefault: PropTypes.bool,
  tag: PropTypes.string,
};

DialogButton.defaultProps = {
  isDefault: false,
};

export default DialogButton;
