// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import {withRipple} from '@material/react-ripple';

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
