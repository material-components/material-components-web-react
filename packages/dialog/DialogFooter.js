import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {cssClasses} from './constants';

const DialogFooter = ({tag: Tag, className, children, ...otherProps}) => (
  <Tag className={classnames(className, cssClasses.ACTIONS)} {...otherProps}>
    {children}
  </Tag>
);

DialogFooter.propTpyes = {
  className: PropTypes.string,
  tag: PropTypes.string,
};

DialogFooter.defaultProps = {
  className: '',
  tag: 'footer',
};

export default DialogFooter;
