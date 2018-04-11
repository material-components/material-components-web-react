import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {MDCRippleFoundation, util} from '@material/ripple';

const withRipple = (WrappedComponent) => {
  class RippledComponent extends Component {

    foundation_ = null;
    adapter_ = null;
    instance_ = null;

    state = {
      classList: new Set(),
      style: {},
    };

    componentDidMount() {
      if (!this.adapter_) {
        throw new Error('You must call initRipple from the element\'s ' +
          'ref prop to initialize the adapter for withRipple');
      }
      this.foundation_ = new MDCRippleFoundation(this.adapter_);
      this.foundation_.init();
    }

    componentWillUnmount() {
      if (this.foundation_) {
        this.foundation_.destroy();
      }
    }

    createAdapter = (instance) => {
      const adapter = {
        browserSupportsCssVars: () => util.supportsCssVariables(window),
        isUnbounded: () => this.props.unbounded,
        isSurfaceActive: () => this.state.isActivated,
        isSurfaceDisabled: () => this.props.disabled,
        addClass: (className) =>
          this.setState({classList: this.state.classList.add(className)}),
        removeClass: (className) => {
          const {classList} = this.state;
          classList.delete(className);
          this.setState({classList});
        },
        registerDocumentInteractionHandler: (evtType, handler) =>
          document.documentElement.addEventListener(evtType, handler, util.applyPassive()),
        deregisterDocumentInteractionHandler: (evtType, handler) =>
          document.documentElement.removeEventListener(evtType, handler, util.applyPassive()),
        registerResizeHandler: (handler) => window.addEventListener('resize', handler),
        deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
        updateCssVariable: this.updateCssVariable,
        computeBoundingRect: () => instance.getBoundingClientRect(),
        getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset}),
      };

      this.instance_ = instance;
      this.adapter_ = adapter;
    }

    get classes() {
      const {className: wrappedCompClasses} = this.props;
      const {classList} = this.state;

      return classnames(Array.from(classList), wrappedCompClasses);
    }

    handleEvent = (e, eventType) => {
      const {onMouseDown, onMouseUp, onTouchStart, onKeyDown} = this.props;

      let action;
      switch (eventType) {
        case 'onMouseDown':
          action = onMouseDown;
          this.setState({isActivated: true});
          break;
        case 'onMouseUp':
          action = onMouseUp;
          this.setState({isActivated: false});
          break;
        case 'onTouchStart':
          action = onTouchStart;
          break;
        case 'onKeyDown':
          action = onKeyDown;
          break;
      }

      if (eventType !== 'onMouseUp') {
        this.activateRipple(e);
      }
      action(e);
    }

    activateRipple = (e) => {
      // https://reactjs.org/docs/events.html#event-pooling
      e.persist();
      this.foundation_.activate(e);
    }

    updateCssVariable = (varName, value) => {
      const updatedStyle = Object.assign({}, this.state.style);
      updatedStyle[varName] = value;
      this.setState({style: updatedStyle});
    }

    getMergedStyles = () => {
      const {style: wrappedStyle} = this.props;
      const {style} = this.state;
      return Object.assign({}, style, wrappedStyle);
    }

    render() {
      const {
        /* start black list of otherprops */
        /* eslint-disable */
        unbounded,
        style,
        className,
        onMouseDown,
        onMouseUp,
        onTouchStart,
        onKeyDown,
        /* eslint-enable */
        /* end black list of otherprops */
        ...otherProps
      } = this.props;

      const updatedProps = Object.assign({
        onMouseDown: (e) => this.handleEvent(e, 'onMouseDown'),
        onMouseUp: (e) => this.handleEvent(e, 'onMouseUp'),
        onTouchStart: (e) => this.handleEvent(e, 'onTouchStart'),
        onKeyDown: (e) => this.handleEvent(e, 'onKeyDown'),
        // call initRipple on ref on root element that needs ripple
        initRipple: this.createAdapter,
        className: this.classes,
        style: this.getMergedStyles(),
      },
      otherProps);

      return <WrappedComponent {...updatedProps} />;
    }
  }

  WrappedComponent.propTypes = Object.assign({
    unbounded: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onKeyDown: PropTypes.func,
  }, WrappedComponent.propTypes);

  WrappedComponent.defaultProps = Object.assign({
    unbounded: false,
    disabled: false,
    style: {},
    className: '',
    onMouseDown: () => {},
    onMouseUp: () => {},
    onTouchStart: () => {},
    onKeyDown: () => {},
  }, WrappedComponent.defaultProps);

  RippledComponent.propTypes = WrappedComponent.propTypes;
  RippledComponent.defaultProps = WrappedComponent.defaultProps;

  return RippledComponent;
};

export default withRipple;
