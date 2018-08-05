import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class Shape extends Component {
  render() {
    const {
      className,
      topLeft,
      topRight,
      bottomRight,
      bottomLeft,
      children,
      ...otherProps
    } = this.props;

    const classes = classnames('mdc-shape-container', className);

    return (
      <div
        className={classes}
        {...otherProps}
      >
        {children}
        {topLeft ? this.renderTopLeft() : null}
        {topRight ? this.renderTopRight() : null}
        {bottomRight ? this.renderBottomRight() : null}
        {bottomLeft ? this.renderBottomLeft() : null}
      </div>
    );
  }

  renderTopLeft() {
    return <div className="mdc-shape-container__corner mdc-shape-container__corner--top-left"></div>;
  }

  renderTopRight() {
    return <div className="mdc-shape-container__corner mdc-shape-container__corner--top-right"></div>;
  }

  renderBottomRight() {
    return <div className="mdc-shape-container__corner mdc-shape-container__corner--bottom-right"></div>;
  }

  renderBottomLeft() {
    return <div className="mdc-shape-container__corner mdc-shape-container__corner--bottom-left"></div>;
  }
}

Shape.propTypes = {
  className: PropTypes.string,
  topLeft: PropTypes.bool,
  topRight: PropTypes.bool,
  bottomRight: PropTypes.bool,
  bottomLeft: PropTypes.bool,
  children: PropTypes.string,
};

Shape.defaultProps = {
  className: '',
  topLeft: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  children: '',
};

export default Shape;
