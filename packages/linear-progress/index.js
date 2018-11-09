import {MDCLinearProgressFoundation} from '@material/linear-progress/dist/mdc.linearProgress';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

class LinearProgress extends React.Component {
  constructor(props) {
    super(props);
    this.bufferElement_ = null;
    this.foundation_ = null;
    this.primaryBarElement_ = null;
    this.state = {
      classList: new Set(),
    };
  }

  componentDidMount() {
    const {buffer, indeterminate, progress, reversed} = this.props;
    this.foundation_ = new MDCLinearProgressFoundation(this.adapter);
    this.foundation_.init();
    this.foundation_.setBuffer(buffer);
    this.foundation_.setDeterminate(!indeterminate);
    this.foundation_.setProgress(progress);
    this.foundation_.setReverse(reversed);
  }

  componentDidUpdate(prevProps) {
    const {
      buffer: prevBuffer,
      indeterminate: prevIndeterminate,
      progress: prevProgress,
      reversed: prevReversed,
    } = prevProps;
    const {buffer, indeterminate, progress, reversed} = this.props;
    if (buffer !== prevBuffer) {
      this.foundation_.setBuffer(buffer);
    }
    if (indeterminate !== prevIndeterminate) {
      this.foundation_.setDeterminate(!indeterminate);
    }
    if (progress !== prevProgress) {
      this.foundation_.setProgress(progress);
    }
    if (reversed !== prevReversed) {
      this.foundation_.setReverse(reversed);
    }
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get adapter() {
    return {
      addClass: (className) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      getBuffer: () => {
        return this.bufferElement_;
      },
      getPrimaryBar: () => {
        return this.primaryBarElement_;
      },
      hasClass: (className) => {
        return this.state.classList.has(className);
      },
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      setStyle: (element, propertyName, value) => {
        element.style.setProperty(propertyName, value);
      },
    };
  }

  get classes() {
    const {className, indeterminate, reversed} = this.props;
    const {classList} = this.state;
    return classnames('mdc-linear-progress', Array.from(classList), className, {
      'mdc-linear-progress--indeterminate': indeterminate,
      'mdc-linear-progress--reversed': reversed,
    });
  }

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      buffer,
      bufferingDots,
      // eslint-disable-next-line no-unused-vars
      className,
      // eslint-disable-next-line no-unused-vars
      indeterminate,
      // eslint-disable-next-line no-unused-vars
      progress,
      // eslint-disable-next-line no-unused-vars
      reversed,
      ...otherProps
    } = this.props;
    return (
      <div className={this.classes} role="progressbar" {...otherProps}>
        {bufferingDots && <div className="mdc-linear-progress__buffering-dots"></div>}
        <div
          className="mdc-linear-progress__buffer"
          ref={(bufferElement_) => {
            this.bufferElement_ = bufferElement_;
          }}
        ></div>
        <div
          className="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          ref={(primaryBarElement_) => {
            this.primaryBarElement_ = primaryBarElement_;
          }}
        >
          <span className="mdc-linear-progress__bar-inner"></span>
        </div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span className="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>
    );
  }
}

LinearProgress.propTypes = {
  buffer: PropTypes.number,
  bufferingDots: PropTypes.bool,
  className: PropTypes.string,
  indeterminate: PropTypes.bool,
  progress: PropTypes.number,
  reversed: PropTypes.bool,
};

LinearProgress.defaultProps = {
  buffer: 0,
  bufferingDots: true,
  className: '',
  indeterminate: false,
  progress: 0,
  reversed: false,
};

export default LinearProgress;
