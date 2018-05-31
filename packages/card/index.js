import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ActionButtons from './ActionButtons';
import ActionIcons from './ActionIcons';
import Actions from './Actions';
import PrimaryContent from './PrimaryContent';
import Media from './Media';

export default class Card extends React.Component {
  render() {
    const {
      className,
      children,
      outlined,
      ...otherProps
    } = this.props;
    const classes = classnames('mdc-card', className, {
      'mdc-card--outlined': outlined,
    });

    return (
      <div
        className={classes}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  outlined: PropTypes.bool,
};

Card.defaultProps = {
  children: null,
  className: '',
  outlined: false,
};


export {
  ActionButtons as CardActionButtons,
  ActionIcons as CardActionIcons,
  Actions as CardActions,
  PrimaryContent as CardPrimaryContent,
  Media as CardMedia,
};
