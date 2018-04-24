import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCNotchedOutlineFoundation} from '@material/notched-outline';

export default class NotchedOutline extends React.Component {

  foundation_ = null;

  state = {
    classList: new Set(),
  };

  constructor(props) {
    super(props);

    this.outlineElement_ = React.createRef();
    this.pathElement_ = React.createRef();
    this.idleElement_ = React.createRef();
  }

  componentDidMount() {
    this.foundation_ = new MDCNotchedOutlineFoundation(this.adapter);
    this.foundation_.init();

    const {notch, notchWidth, isRtl} = this.props;
    if (notch) {
      this.foundation_.notch(notchWidth, isRtl);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  componentWillReceiveProps(nextProps) {
    const hasToggledNotch = this.props.notch !== nextProps.notch;
    const hasToggleRtl = this.props.isRtl !== nextProps.isRtl;
    const notchWidthUpdated = this.props.notchWidth !== nextProps.notchWidth;
    const shouldUpdateNotch = notchWidthUpdated || hasToggleRtl || hasToggledNotch;

    if (shouldUpdateNotch) {
      if(nextProps.notch) {
        const {notchWidth, isRtl} = nextProps;
        this.foundation_.notch(notchWidth, isRtl);
      } else {
        this.foundation_.closeNotch();
      }
    }
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-notched-outline', Array.from(classList), className);
  }

  get adapter() {
    return {
      getWidth: () => this.outlineElement_.current.offsetWidth,
      getHeight: () => this.outlineElement_.current.offsetHeight,
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      setOutlinePathAttr: (value) => this.pathElement_.current.setAttribute('d', value),
      getIdleOutlineStyleValue: (propertyName) =>
        window.getComputedStyle(this.idleElement_.current).getPropertyValue(propertyName),
    };
  }

  render() {
    return ([
      <div
        className={this.classes}
        key='notched-outline'
        ref={this.outlineElement_}>
        <svg>
          <path ref={this.pathElement_}
            className='mdc-notched-outline__path' />
        </svg>
      </div>,
      <div
        ref={this.idleElement_}
        className='mdc-notched-outline__idle'
        key='notched-outline-idle'></div>
    ]);
  }
}

NotchedOutline.propTypes = {
  className: PropTypes.string,
  isRtl: PropTypes.bool,
  notch: PropTypes.bool,
  notchWidth: PropTypes.number,
};

NotchedOutline.defaultProps = {
  className: '',
  isRtl: false,
  notch: false,
  notchWidth: 0,
};
