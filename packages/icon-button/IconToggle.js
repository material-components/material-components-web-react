import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class IconToggle extends Component {
  render() {
    const {isOn, className, children} = this.props;
    const classes = classnames(
      'mdc-icon-button__icon',
      {'mdc-icon-button__icon--on': isOn},
      className,
    );
    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}

IconToggle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isOn: PropTypes.bool,
};

IconToggle.defaultProps = {
  children: '',
  className: '',
  isOn: false,
};
