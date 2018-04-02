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

  render() {
    this.children = React.Children.map(this.props.children, (item) => {
      const className = `${item.props.className} mdc-fab__icon`;
      const props = Object.assign({}, item.props, {className: className});
      return React.cloneElement(item, props);
    });
    return (
        <button className={this.classes}>
          {this.children}
        </button>
    );
  }
}

Fab.propTypes = {
  mini: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.element,
};

Fab.defaultProps = {
  mine: false,
  className: '',
};
