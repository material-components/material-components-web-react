import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  MDCTopAppBarFoundation,
  MDCShortTopAppBarFoundation,
} from '@material/top-app-bar';
import {cssClasses} from './constants';

export default class TopAppBar extends React.Component {

  foundation_ = null;

  state = {
    classList: new Set(),
  };

  get classes() {
    const {classList} = this.state;
    const {
      shortCollapsed,
      className,
      short,
      prominent,
    } = this.props;

    return classnames('mdc-top-app-bar', Array.from(classList), className, {
      'mdc-top-app-bar--short': shortCollapsed || short,
      'mdc-top-app-bar--short-collapsed': shortCollapsed,
      'mdc-top-app-bar--prominent': prominent,
    });
  }

  componentDidMount() {
    this.initializeFoundation();
  }

  componentWillUnmount() {
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

  addClassesToElement(classes, element) {
    // check if element passed is a user defined React Component
    // const isComponent = typeof element.type === 'function';
    // let elementInstance = element;
    //
    // if (isComponent) {
    //   return element;
    // }

    const propsWithClasses = {
      className: classnames(classes, element.props.className),
    };
    return React.cloneElement(element, propsWithClasses);
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
        window.addEventListener('scroll', handler),
      deregisterScrollHandler: (handler) =>
        window.removeEventListener('scroll', handler),
      getViewportScrollY: () => window.pageYOffset,
      getTotalActionItems: () => !!(actionItems && actionItems.length),
    };
  }

  render() {
    return (
      <header className={this.classes}>
        <div className='mdc-top-app-bar__row'>
          {this.renderTitleAndNavigationSection()}
          {this.renderActionItems()}
        </div>
      </header>
    );
  }

  renderTitleAndNavigationSection() {
    const {title} = this.props;
    const classes =
      'mdc-top-app-bar__section mdc-top-app-bar__section--align-start';

    return (
      <section className={classes}>
        {this.renderNavigationIcon()}
        <span className="mdc-top-app-bar__title">
          {title}
        </span>
      </section>
    );
  }

  renderNavigationIcon() {
    const {navigationIcon} = this.props;

    if (!navigationIcon) {
      return;
    }

    return this.addClassesToElement(cssClasses.NAVIGATION_ICON, navigationIcon);
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
        {/* to set key on the element, the element needs to be cloned */}
        {actionItems.map((item, key) => {
          const elementWithClasses = this.addClassesToElement(cssClasses.ACTION_ITEM, item);
          return React.cloneElement(elementWithClasses, {key});
        })}
      </section>
    );
  }

}

TopAppBar.propTypes = {
  shortCollapsed: PropTypes.bool,
  short: PropTypes.bool,
  prominent: PropTypes.bool,
  title: PropTypes.string,
  actionItems: PropTypes.arrayOf(PropTypes.element),
  navigationIcon: PropTypes.element,
  className: PropTypes.string,
};

TopAppBar.defaultProps = {
  shortCollapsed: false,
  short: false,
  prominent: false,
  title: '',
  actionItems: null,
  navigationIcon: null,
  className: '',
};
