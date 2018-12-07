import { MDCLinearProgressFoundation } from "@material/linear-progress/dist/mdc.linearProgress";
import classnames from "classnames";
import React from "react";
type LinearProgressProps = {
  buffer?: number,
  bufferingDots?: boolean,
  className?: string,
  closed?: boolean,
  indeterminate?: boolean,
  progress?: number,
  reversed?: boolean,
  tag?: string
};
type LinearProgressState = {
  classList: Set<any>
};
class LinearProgress extends React.Component<
  LinearProgressProps,
  LinearProgressState
> {
  isMounted_ = false;
  constructor(props) {
    super(props);
    this.bufferElement_ = React.createRef();
    this.foundation_ = new MDCLinearProgressFoundation(this.adapter);
    this.primaryBarElement_ = React.createRef();
    this.state = {
      classList: new Set()
    };
  }
  componentDidMount() {
    const { buffer, closed, indeterminate, progress, reversed } = this.props;
    this.isMounted_ = true;
    this.foundation_.init();
    this.foundation_.setBuffer(buffer);
    this.foundation_.setDeterminate(!indeterminate);
    this.foundation_.setProgress(progress);
    this.foundation_.setReverse(reversed);
    if (closed) {
      this.foundation_.close();
    }
  }
  componentDidUpdate(prevProps) {
    const {
      buffer: prevBuffer,
      closed: prevClosed,
      indeterminate: prevIndeterminate,
      progress: prevProgress,
      reversed: prevReversed
    } = prevProps;
    const { buffer, closed, indeterminate, progress, reversed } = this.props;
    if (buffer !== prevBuffer) {
      this.foundation_.setBuffer(buffer);
    }
    if (closed && !prevClosed) {
      this.foundation_.close();
    }
    if (!closed && prevClosed) {
      this.foundation_.open();
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
    this.isMounted_ = false;
    this.foundation_.destroy();
  }
  get adapter() {
    return {
      addClass: className => {
        if (this.isMounted_) {
          const { classList } = this.state;
          classList.add(className);
          this.setState({ classList });
        }
      },
      getBuffer: () => {
        return this.bufferElement_.current;
      },
      getPrimaryBar: () => {
        return this.primaryBarElement_.current;
      },
      hasClass: className => {
        return this.state.classList.has(className);
      },
      removeClass: className => {
        if (this.isMounted_) {
          const { classList } = this.state;
          classList.delete(className);
          this.setState({ classList });
        }
      },
      setStyle: (element, propertyName, value) => {
        if (this.isMounted_) {
          element.style.setProperty(propertyName, value);
        }
      }
    };
  }
  get classes() {
    const { className, indeterminate, reversed } = this.props;
    const { classList } = this.state;
    return classnames("mdc-linear-progress", Array.from(classList), className, {
      "mdc-linear-progress--indeterminate": indeterminate,
      "mdc-linear-progress--reversed": reversed
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
      closed,
      // eslint-disable-next-line no-unused-vars
      indeterminate,
      // eslint-disable-next-line no-unused-vars
      progress,
      // eslint-disable-next-line no-unused-vars
      reversed,
      tag: Tag,
      ...otherProps
    } = this.props;
    return (
      <Tag className={this.classes} role="progressbar" {...otherProps}>
        {bufferingDots && (
          <div className="mdc-linear-progress__buffering-dots" />
        )}
        <div
          className="mdc-linear-progress__buffer"
          ref={this.bufferElement_}
        />
        <div
          className="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          ref={this.primaryBarElement_}
        >
          <span className="mdc-linear-progress__bar-inner" />
        </div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span className="mdc-linear-progress__bar-inner" />
        </div>
      </Tag>
    );
  }
}
LinearProgress.defaultProps = {
  buffer: 0,
  bufferingDots: true,
  className: "",
  closed: false,
  indeterminate: false,
  progress: 0,
  reversed: false,
  tag: "div"
};
export default LinearProgress;
