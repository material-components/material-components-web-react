import * as React from 'react';
import {assert} from 'chai';
import * as td from 'testdouble';
// @ts-ignore
import {MDCRippleFoundation} from '@material/ripple';
import {mount} from 'enzyme';
import withRipple, {InjectedProps} from '../../../packages/ripple/index';
import {createMockRaf} from '../helpers/raf';

interface DivProps extends InjectedProps<HTMLDivElement> {
  children?: React.ReactNode,
  className: string,
  initRipple: (surface: HTMLDivElement) => void,
  unbounded: boolean,
}

/*eslint-disable */
const Div: React.FunctionComponent<DivProps> = ({
  children,
  className = "",
  initRipple,
  unbounded,
  ...otherProps
}) => {
  /* eslint-enable */
  const classes = `ripple-test-component ${className}`;
  return (
    <div className={classes} ref={initRipple} {...otherProps}>
      {children}
    </div>
  );
};

const DivRipple = withRipple<DivProps, HTMLDivElement>(Div);

interface RippledComponent extends React.Component<InjectedProps<HTMLDivElement>> {
  foundation_: MDCRippleFoundation
  isMounted_: boolean;
}

suite('Ripple');

test('classNames adds classes', () => {
  const mockRaf = createMockRaf();
  const wrapper = mount<DivProps>(<DivRipple />);
  mockRaf.flush();
  assert.equal(wrapper.find('.ripple-test-component').length, 1);
  // need update because setState is async
  assert.isTrue(
    wrapper
      .update()
      .find('.ripple-test-component')
      .hasClass('mdc-ripple-upgraded')
  );
  mockRaf.restore();
});

test('mouseDown event triggers activateRipple', () => {
  const mockRaf = createMockRaf();
  const mouseDownHandler = td.func() as React.MouseEventHandler;
  const wrapper = mount<DivProps>(<DivRipple onMouseDown={mouseDownHandler} />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.activate = td.func();
  wrapper.simulate('mouseDown');
  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 1});
  td.verify(mouseDownHandler(td.matchers.isA(Object)), {times: 1});
  mockRaf.restore();
});

test('mouseUp event triggers deactivateRipple', () => {
  const mouseUpHandler = td.func() as React.MouseEventHandler;
  const wrapper = mount<DivProps>(<DivRipple onMouseUp={mouseUpHandler} />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.deactivate = td.func();
  wrapper.simulate('mouseUp');
  td.verify(foundation.deactivate(td.matchers.isA(Object)), {times: 1});
  td.verify(mouseUpHandler(td.matchers.isA(Object)), {times: 1});
});

test('mouseUp event triggers deactivateRipple with no onMouseUp handler', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.deactivate = td.func();
  wrapper.simulate('mouseUp');
  td.verify(foundation.deactivate(td.matchers.isA(Object)), {times: 1});
});

test('touchStart event triggers activateRipple', () => {
  const mockRaf = createMockRaf();
  const touchStartHandler = td.func() as React.TouchEventHandler;
  const wrapper = mount<DivProps>(<DivRipple onTouchStart={touchStartHandler} />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.activate = td.func();
  wrapper.simulate('touchStart');
  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 1});
  td.verify(touchStartHandler(td.matchers.isA(Object)), {times: 1});
  mockRaf.restore();
});

test('touchStart event triggers activateRipple with no onTouchStart handler', () => {
  const mockRaf = createMockRaf();
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.activate = td.func();
  wrapper.simulate('touchStart');
  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 1});
  mockRaf.restore();
});

test('touchEnd event triggers deactivateRipple', () => {
  const touchEndHandler = td.func() as React.TouchEventHandler;
  const wrapper = mount<DivProps>(<DivRipple onTouchEnd={touchEndHandler} />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.deactivate = td.func();
  wrapper.simulate('touchEnd');
  td.verify(foundation.deactivate(td.matchers.isA(Object)), {times: 1});
  td.verify(touchEndHandler(td.matchers.isA(Object)), {times: 1});
});

test('touchEnd event triggers deactivateRipple with no onTouchEnd handler', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.deactivate = td.func();
  wrapper.simulate('touchEnd');
  td.verify(foundation.deactivate(td.matchers.isA(Object)), {times: 1});
});

test('keyDown event triggers activateRipple', () => {
  const mockRaf = createMockRaf();
  const keyDownHandler = td.func() as React.KeyboardEventHandler;
  const wrapper = mount<DivProps>(<DivRipple onKeyDown={keyDownHandler} />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.activate = td.func();
  wrapper.simulate('keyDown');
  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 1});
  td.verify(keyDownHandler(td.matchers.isA(Object)), {times: 1});
  mockRaf.restore();
});

test('keyDown event triggers activateRipple with no onKeyDown handler', () => {
  const mockRaf = createMockRaf();
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.activate = td.func();
  wrapper.simulate('keyDown');
  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 1});
  mockRaf.restore();
});

test('keyUp event triggers deactivateRipple', () => {
  const keyUpHandler = td.func() as React.KeyboardEventHandler;
  const wrapper = mount<DivProps>(<DivRipple onKeyUp={keyUpHandler} />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.deactivate = td.func();
  wrapper.simulate('keyUp');
  td.verify(foundation.deactivate(td.matchers.isA(Object)), {times: 1});
  td.verify(keyUpHandler(td.matchers.isA(Object)), {times: 1});
});

test('keyUp event triggers deactivateRipple with no onKeyUp handler', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.deactivate = td.func();
  wrapper.simulate('keyUp');
  td.verify(foundation.deactivate(td.matchers.isA(Object)), {times: 1});
});

test('focus event proxies to foundation focus handler', () => {
  const focusHandler = td.func() as React.FocusEventHandler;
  const wrapper = mount<DivProps>(<DivRipple onFocus={focusHandler} />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.handleFocus = td.func();
  wrapper.simulate('focus');
  td.verify(foundation.handleFocus(), {times: 1});
  td.verify(focusHandler(td.matchers.isA(Object)), {times: 1});
});

test('focus event proxies to foundation focus handler with no onFocus handler', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.handleFocus = td.func();
  wrapper.simulate('focus');
  td.verify(foundation.handleFocus(), {times: 1});
});

test('blur event proxies to foundation blur handler', () => {
  const blurHandler = td.func() as React.FocusEventHandler;
  const wrapper = mount<DivProps>(<DivRipple onBlur={blurHandler} />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.handleBlur = td.func();
  wrapper.simulate('blur');
  td.verify(foundation.handleBlur(), {times: 1});
  td.verify(blurHandler(td.matchers.isA(Object)), {times: 1});
});

test('blur event proxies to foundation blur handler with no onBlur handler', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.handleBlur = td.func();
  wrapper.simulate('blur');
  td.verify(foundation.handleBlur(), {times: 1});
});

test('#adapter.isUnbounded returns true is prop is set', () => {
  const wrapper = mount<DivProps>(<DivRipple unbounded />);
  assert.isTrue((wrapper.instance() as RippledComponent).foundation_.adapter_.isUnbounded());
});

test('#adapter.isUnbounded returns false prop is not set', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  assert.isFalse((wrapper.instance() as RippledComponent).foundation_.adapter_.isUnbounded());
});

test('#adapter.isSurfaceDisabled returns true is prop is set', () => {
  const wrapper = mount<DivProps>(<DivRipple disabled />);
  assert.isTrue((wrapper.instance() as RippledComponent).foundation_.adapter_.isSurfaceDisabled());
});

test('#adapter.isSurfaceDisabled returns false prop is not set', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  assert.isFalse((wrapper.instance() as RippledComponent).foundation_.adapter_.isSurfaceDisabled());
});

test('#adapter.addClass adds a class to the root element', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  (wrapper.instance() as RippledComponent).foundation_.adapter_.addClass('test-class');
  assert.isTrue(
    wrapper
      .update()
      .find('.ripple-test-component')
      .hasClass('test-class')
  );
});

test('#adapter.addClass does not add class if isMounted is false', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  (wrapper.instance() as RippledComponent).isMounted_ = false;
  (wrapper.instance() as RippledComponent).foundation_.adapter_.addClass('test-class');
  assert.isFalse(
    wrapper
      .update()
      .find('.ripple-test-component')
      .hasClass('test-class')
  );
});

test('#adapter.removeClass removes a class to the root element', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  (wrapper.instance() as RippledComponent).foundation_.adapter_.addClass('test-class');
  wrapper.update();
  (wrapper.instance() as RippledComponent).foundation_.adapter_.removeClass('test-class');
  assert.isFalse(
    wrapper
      .update()
      .find('.ripple-test-component')
      .hasClass('test-class')
  );
});

test('#adapter.removeClass removes a class to the root element', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  (wrapper.instance() as RippledComponent).foundation_.adapter_.addClass('test-class');
  (wrapper.instance() as RippledComponent).isMounted_ = false;
  wrapper.update();
  (wrapper.instance() as RippledComponent).foundation_.adapter_.removeClass('test-class');
  assert.isTrue(
    wrapper
      .update()
      .find('.ripple-test-component')
      .hasClass('test-class')
  );
});

test('#adapter.updateCssVariable updates style', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  (wrapper.instance() as RippledComponent).foundation_.adapter_.updateCssVariable('color', 'blue');
  assert.equal(wrapper.state().style.color, 'blue');
});

test('#adapter.updateCssVariable does not update style if isMounted_ is false', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  (wrapper.instance() as RippledComponent).isMounted_ = false;
  (wrapper.instance() as RippledComponent).foundation_.adapter_.updateCssVariable('color', 'blue');
  assert.notEqual(wrapper.state().style.color, 'blue');
});

test('#adapter.registerDocumentInteractionHandler triggers handler on document scroll', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const testHandler = td.func();
  (wrapper.instance() as RippledComponent)
    .foundation_.adapter_.registerDocumentInteractionHandler(
      'scroll',
      testHandler
    );
  const event = new Event('scroll');
  document.documentElement.dispatchEvent(event);
  td.verify(testHandler(event), {times: 1});
});

test('#adapter.deregisterDocumentInteractionHandler does not trigger handler on document scroll', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const testHandler = td.func();
  (wrapper.instance() as RippledComponent)
    .foundation_.adapter_.registerDocumentInteractionHandler(
      'scroll',
      testHandler
    );
  const event = new Event('scroll');
  (wrapper.instance() as RippledComponent)
    .foundation_.adapter_.deregisterDocumentInteractionHandler(
      'scroll',
      testHandler
    );
  document.documentElement.dispatchEvent(event);
  td.verify(testHandler(event), {times: 0});
});

test('#adapter.registerResizeHandler triggers handler on window resize', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const testHandler = td.func();
  (wrapper.instance() as RippledComponent).foundation_.adapter_.registerResizeHandler(testHandler);
  const event = new Event('resize');
  window.dispatchEvent(event);
  td.verify(testHandler(event), {times: 1});
});
test(
  '#adapter.deregisterResizeHandler does not trigger handler ' +
    'after registering resize handler',
  () => {
    const wrapper = mount<DivProps>(<DivRipple />);
    const testHandler = td.func();
    (wrapper.instance() as RippledComponent).foundation_.adapter_.registerResizeHandler(testHandler);
    const event = new Event('resize');
    (wrapper.instance() as RippledComponent)
      .foundation_.adapter_.deregisterResizeHandler(testHandler);
    window.dispatchEvent(event);
    td.verify(testHandler(event), {times: 0});
  }
);

test('#adapter.computeBoundingRect returns height and width', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const domRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  assert.deepInclude(
    (wrapper.update().instance() as RippledComponent)
      .foundation_.adapter_.computeBoundingRect(),
    domRect
  );
});

test('#adapter.getWindowPageOffset returns height and width', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const offset = {x: 0, y: 0};
  assert.deepEqual(
    (wrapper.update().instance() as RippledComponent)
      .foundation_.adapter_.getWindowPageOffset(),
    offset
  );
});

test('#componentWillUnmount destroys foundation', () => {
  const mockRaf = createMockRaf();
  const wrapper = mount<DivProps>(<DivRipple />);
  mockRaf.flush();
  const foundation = (wrapper.instance() as RippledComponent).foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
  mockRaf.restore();
});

test('throws error if no foundation', () => {
  const DivNoRef = () => <div />;
  const DivNoRefRipple = withRipple(DivNoRef);
  assert.throws(DivNoRefRipple.prototype.componentDidMount);
});

test('unmounting component does not throw errors', (done) => {
  // related to
  // https://github.com/material-components/material-components-web-react/issues/199
  class TestComp extends React.Component {
    state = {showRippleElement: true};
    render() {
      if (!this.state.showRippleElement) return <span>hi</span>;
      return (
        <DivRipple
          onMouseDown={() => this.setState({showRippleElement: false})}
        />
      );
    }
  }
  const wrapper = mount<TestComp>(<TestComp />);
  wrapper.simulate('mouseDown');
  requestAnimationFrame(() => {
    assert.equal((wrapper.getDOMNode() as HTMLSpanElement).innerText, 'hi');
    done();
  });
});
