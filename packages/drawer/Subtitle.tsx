import * as React from 'react';
import * as classnames from 'classnames';

export interface DrawerSubTitleProps {
  tag?: string,
  className?: string
};

const DrawerSubTitle: React.SFC<DrawerSubTitleProps> = ({
  tag: Tag = 'h6', children, className = '', ...otherProps // eslint-disable-line react/prop-types
}) => {
  return (
    <Tag
      className={classnames('mdc-drawer__subtitle', className)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

export default DrawerSubTitle;
