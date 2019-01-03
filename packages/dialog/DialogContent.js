import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {cssClasses} from './constants';


const DialogContent = ({className, children, tag: Tag, ...otherProps}) => (
  <Tag className={classnames(className, cssClasses.CONTENT)} {...otherProps}>
    {children}
  </Tag>
);

DialogContent.propTpyes = {
  className: PropTypes.string,
  tag: PropTypes.string,
  id: PropTypes.string,
};

DialogContent.defaultProps = {
  className: '',
  tag: 'div',
};

export default DialogContent;
