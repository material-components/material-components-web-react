import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  MDCTopAppBarFoundation,
  MDCShortTopAppBarFoundation,
  util,
} from '@material/top-app-bar';

export default class TopAppBar extends React.Component {

  foundation_ = null;

  state = {
    classList: new Set(),
  };

  get classes() {
    const {classList} = this.state;
    const {
      alwaysCollapsed,
      className,
      short,
      prominent,
    } = this.props;

    return classnames('mdc-top-app-bar', Array.from(classList), className, {
      'mdc-top-app-bar--short': alwaysCollapsed || short,
      'mdc-top-app-bar--short-collapsed': alwaysCollapsed,
      'mdc-top-app-bar--prominent': prominent,
    });
  }

  componentDidMount() {
    this.initializeFoundation();
  }

  componentWillUnmount() {
    // remember to always call destroy when the component is
    // removed from the DOM.
    this.foundation_.destroy();
  }

  initializeFoundation = () => {
    if (this.props.short) {
      this.foundation_ = new MDCShortTopAppBarFoundation(this.adapter);
    } else {
      this.foundation_ = new MDCTopAppBarFoundation(this.adapter);
    }

    this.foundation_.init();
  }

  get adapter() {
    const {actionItems} = this.props;

    return {
      addClass: (className) =>
        this.setState({classList: this.state.classList.add(className)}),
      removeClass: (className) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      hasClass: (className) => this.classes.split(' ').includes(className),
      registerScrollHandler: (handler) =>
        window.addEventListener('scroll', handler, util.applyPassive()),
      deregisterScrollHandler: (handler) =>
        window.removeEventListener('scroll', handler),
      getViewportScrollY: () => window.pageYOffset,
      getTotalActionItems: () => !!(actionItems && actionItems.length),
    };
  }

  render() {
    const {
      title,
      navIcon,
    } = this.props;
    const sectionClasses =
      'mdc-top-app-bar__section mdc-top-app-bar__section--align-start';

    return (
      <header className={this.classes}>
        <div className='mdc-top-app-bar__row'>
          <section className={sectionClasses}>
            {navIcon ? navIcon : null}
            <span className="mdc-top-app-bar__title">
              {title}
            </span>
          </section>
          {this.renderActionItems()}
        </div>
      </header>
    );
  }

  renderActionItems() {
    const {actionItems} = this.props;
    if (!actionItems) {
      return;
    }

    return (
      <section
        className='mdc-top-app-bar__section mdc-top-app-bar__section--align-end'
        role='toolbar'
      >
        {/* need to close element to set key */}
        {actionItems.map((item, key) => React.cloneElement(item, {key}))}
      </section>
    );
  }

}

TopAppBar.propTypes = {
  alwaysCollapsed: PropTypes.bool,
  short: PropTypes.bool,
  prominent: PropTypes.bool,
  title: PropTypes.string,
  actionItems: PropTypes.arrayOf(PropTypes.element),
  navIcon: PropTypes.element,
  className: PropTypes.string,
};

TopAppBar.defaultProps = {
  alwaysCollapsed: false,
  short: false,
  prominent: false,
  title: '',
  actionItems: null,
  navIcon: null,
  className: '',
};
