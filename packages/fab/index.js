import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Fab extends React.Component {

  state = {
    classList: new Set(),
  };

  get classes() {
    const {classList} = this.state;
    const {
      mini,
      className,
    } = this.props;

    return classnames('mdc-fab', Array.from(classList), className, {
      'mdc-fab--mini': mini,
    });
  }

  addIconClassToAllChildren = () => {
    return React.Children.map(this.props.children, (item) => {
      const className = `${item.props.className} mdc-fab__icon`;
      const props = Object.assign({}, item.props, {className});
      return React.cloneElement(item, props);
    });
  };

  render() {
    const children = this.addIconClassToAllChildren();
    return (
        <button className={this.classes}>
          {children}
        </button>
    );
  }
}

Fab.propTypes = {
  mini: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

Fab.defaultProps = {
  mini: false,
  className: '',
};
