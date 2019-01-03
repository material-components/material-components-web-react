import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {cssClasses} from './constants';

const DialogTitle = ({className, children, tag: Tag, ...otherProps}) => (
  <Tag className={classnames(className, cssClasses.TITLE)} {...otherProps}>
    {children}
  </Tag>
);

DialogTitle.propTpyes = {
  className: PropTypes.string,
  tag: PropTypes.string,
  id: PropTypes.string,
};

DialogTitle.defaultProps = {
  className: '',
  tag: 'h2',
};

export default DialogTitle;
