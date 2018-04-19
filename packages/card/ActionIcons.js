import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class ActionIcons extends React.Component {
  addIconClassToChildren = () => {
    return React.Children.map(this.props.children, (item) => {
      const className = classnames(
        item.props.className, 'mdc-card__action', 'mdc-card__action--icon');
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
    const classes = classnames('mdc-card__action-icons', className);

    return (
      <div
        className={classes}
        {...otherProps}
      >
        {this.addIconClassToChildren()}
      </div>
    );
  }
}

ActionIcons.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

ActionIcons.defaultProps = {
  className: '',
  children: null,
};
