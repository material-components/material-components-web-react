import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withRipple from '@material/react-ripple';
import {MDCIconButtonToggleFoundation} from '@material/icon-button';

const {strings} = MDCIconButtonToggleFoundation;

export class IconButtonBase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classList: new Set(),
      childContent: props.children,
      [strings.ARIA_PRESSED]: props[strings.ARIA_PRESSED],
      [strings.ARIA_LABEL]: props[strings.ARIA_LABEL],
    };
  }

  componentDidMount() {
    this.initializeFoundation();
  }

  initializeFoundation = () => {
    this.foundation_ = new MDCIconButtonToggleFoundation(this.adapter);
    this.foundation_.init();
  }

  get classes() {
    const {classList} = this.state;
    const {className} = this.props;
    return classnames('mdc-icon-button', Array.from(classList), className);
  }

  get adapter() {
    return {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      // the foundation needs data attributes that will be passed in as props if the user wants this feature
      getAttr: (attr) => this.props[attr],
      setAttr: (attr, value) => this.setState({[attr]: value}),
      setText: (childContent) => this.setState({childContent}),
    };
  }

  handleClick = (e) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
    this.foundation_.toggle();
  }

  render() {
    const {childContent} = this.state;
    const {
      className,
      initRipple,
      isLink,
      children, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      unbounded, // eslint-disable-line no-unused-vars
      [strings.ARIA_LABEL]: ariaLabel,
      [strings.ARIA_PRESSED]: ariaPressed,
      ...otherProps,
    } = this.props;

    const props = {
      'className': this.classes,
      'ref': initRipple,
      [strings.ARIA_LABEL]: this.state[strings.ARIA_LABEL],
      [strings.ARIA_PRESSED]: this.state[strings.ARIA_PRESSED],
      'onClick': this.handleClick,
      ...otherProps,
    };

    if (isLink) {
      return (
        <a {...props}>
          {childContent}
        </a>
      );
    }

    return (
      <button {...props}>
        {childContent}
      </button>
    );
  }
}

IconButtonBase.propTypes = {
  initRipple: PropTypes.func,
  className: PropTypes.string,
};

IconButtonBase.defaultProps = {
  initRipple: () => {},
  className: '',
};

const RippledIconButton = withRipple(IconButtonBase);

const IconButton = ({children, ...otherProps}) => {
  return (
    <RippledIconButton unbounded {...otherProps}>
      {children}
    </RippledIconButton>
  );
};

export default IconButton;
