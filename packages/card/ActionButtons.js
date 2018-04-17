import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class ActionButtons extends React.Component {
  addButtonClassToChildren = () => {
    return React.Children.map(this.props.children, (item) => {
      const className = classnames(
        item.props.className, 'mdc-card__action', 'mdc-card__action--button');
      const props = Object.assign({}, item.props, {className});
      return React.cloneElement(item, props);
    });
  };

  render() {
    const {
      className,
      children, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;
    const classes = classnames('mdc-card__action-buttons', className);

    return (
      <div
        className={classes}
        {...otherProps}
      >
        {this.addButtonClassToChildren()}
      </div>
    );
  }
}

ActionButtons.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

ActionButtons.defaultProps = {
  className: '',
  children: null,
};
