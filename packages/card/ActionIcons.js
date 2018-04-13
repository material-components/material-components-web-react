import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class ActionIcons extends React.Component {
  addButtonClassToChildren = () => {
    return React.Children.map(this.props.children, (item) => {
      const className = `${item.props.className} mdc-card__action mdc-card__action--icon`;
      const props = Object.assign({}, item.props, {className});
      return React.cloneElement(item, props);
    });
  };

  render() {
    const {
      className,
      children,  // eslint-disable
      fullBleed,
      ...otherProps
    } = this.props;
    const classes = classnames('mdc-card__actions-icons', className);

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

ActionIcons.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  fullBleed: PropTypes.bool,
};

ActionIcons.defaultProps = {
  className: '',
  children: null,
  fullBleed: false,
};
