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

import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '../ripple';
import {MDCChipFoundation} from '@material/chips/dist/mdc.chips';

export class Chip extends Component {
  chipElement_ = null;
  foundation_ = null;
  state = {
    classList: new Set(),
    leadingIconClassList: new Set(),
  };

  componentDidMount() {
    this.foundation_ = new MDCChipFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setSelected(this.props.selected);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.foundation_.setSelected(this.props.selected);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  init = (el) => {
    this.chipElement_ = el;
    this.props.initRipple(el);
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-chip', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      addClassToLeadingIcon: (className) => {
        const {leadingIconClassList} = this.state;
        leadingIconClassList.add(className);
        this.setState({leadingIconClassList});
      },
      removeClassFromLeadingIcon: (className) => {
        const {leadingIconClassList} = this.state;
        leadingIconClassList.delete(className);
        this.setState({leadingIconClassList});
      },
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      getComputedStyleValue: (propertyName) => window.getComputedStyle(this.chipElement_).getPropertyValue(propertyName),
      setStyleProperty: (propertyName, value) => this.chipElement_.style.setProperty(propertyName, value),
    };
  }

  onClick = (e) => {
    const {onClick, id, handleSelect} = this.props;
console.log('hi')
    if (typeof onClick === 'function') {
      onClick(e);
    }
    handleSelect(id);
  }

  handleTransitionEnd = (e) => {
    this.props.onTransitionEnd(e);
    this.props.handleRemove(this.props.id);
    this.foundation_.handleTransitionEnd(e);
  };

  renderLeadingIcon = (leadingIcon) => {
    const {
      className, // eslint-disable-line
      ...otherProps
    } = leadingIcon.props;
    const {leadingIconClassList} = this.state;

    const props = {
      className: classnames(
        className,
        leadingIconClassList,
        'mdc-chip__icon',
        'mdc-chip__icon--leading',
      ),
    };

    return React.cloneElement(leadingIcon, props);
  };

  renderRemoveIcon = (removeIcon) => {
    const {
      className, // eslint-disable-line
      ...otherProps
    } = removeIcon.props;
    const {leadingIconClassList} = this.state;

    const props = {
      className: classnames(
        className,
        leadingIconClassList,
        'mdc-chip__icon',
        'mdc-chip__icon--trailing',
      ),
      onClick: (e) => this.foundation_.handleTrailingIconInteraction(e),
      onKeyDown: (e) => this.foundation_.handleTrailingIconInteraction(e),
      tabIndex: 0,
      role: 'button',
      ...otherProps,
    };

    return React.cloneElement(removeIcon, props);
  };

  render() {
    const {
      /* eslint-disable no-unused-vars */
      id,
      className,
      selected,
      handleSelect,
      handleRemove,
      onClick,
      onTransitionEnd,
      computeBoundingRect,
      initRipple,
      unbounded,
      /* eslint-enable no-unused-vars */
      chipCheckmark,
      leadingIcon,
      removeIcon,
      label,
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        onClick={this.onClick}
        onTransitionEnd={this.handleTransitionEnd}
        ref={this.init}
        {...otherProps}
      >
        {leadingIcon ? this.renderLeadingIcon(leadingIcon) : null}
        {chipCheckmark}
        <div className='mdc-chip__text'>{label}</div>
        {removeIcon ? this.renderRemoveIcon(removeIcon) : null}
      </div>
    );
  }
}

Chip.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  selected: PropTypes.bool,
  handleSelect: PropTypes.func,
  handleRemove: PropTypes.func,
  onClick: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  tabIndex: PropTypes.number,
  // The following props are handled by withRipple and do not require defaults.
  initRipple: PropTypes.func,
  unbounded: PropTypes.bool,
  chipCheckmark: PropTypes.node,
  leadingIcon: PropTypes.element,
  removeIcon: PropTypes.element,
  computeBoundingRect: PropTypes.func,
};

Chip.defaultProps = {
  id: '',
  label: '',
  className: '',
  selected: false,
  tabIndex: 0,
  handleSelect: () => {},
  handleRemove: () => {},
  onClick: () => {},
  onTransitionEnd: () => {},
};

export default withRipple(Chip);
