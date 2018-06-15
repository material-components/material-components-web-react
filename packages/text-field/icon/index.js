import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCTextFieldIconFoundation} from '@material/textfield';

export default class Icon extends React.Component {

  foundation_ = null;

  constructor(props) {
    super(props);
    const {
      tabIndex: tabindex, // note that foundation.js alters tabindex not tabIndex
      role,
    } = props.children.props;

    this.state = {
      tabindex,
      role,
    };
  }

  componentDidMount() {
    this.foundation_ = new MDCTextFieldIconFoundation(this.adapter);
    this.foundation_.init();
    if (this.props.disabled) {
      this.foundation_.setDisabled(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled !== nextProps.disabled) {
      this.foundation_.setDisabled(nextProps.disabled);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get adapter() {
    return {
      getAttr: (attr) => this.state[attr],
      setAttr: (attr, value) => this.setState({[attr]: value}),
      removeAttr: (attr) => this.setState({[attr]: null}),
    };
  }

  addIconAttrsToChildren = () => {
    const {tabindex: tabIndex, role} = this.state;
    const child = React.Children.only(this.props.children);
    const className = classnames('mdc-text-field__icon', child.props.className);
    const props = Object.assign({}, child.props, {
      className, tabIndex, role,
    });
    return React.cloneElement(child, props);
  }

  render() {
    return this.addIconAttrsToChildren();
  }
}

Icon.propTypes = {
  children: PropTypes.element.isRequired,
  disabled: PropTypes.bool,
};

Icon.defaultProps = {
  disabled: false,
};
