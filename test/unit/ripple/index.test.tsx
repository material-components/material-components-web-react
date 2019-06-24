import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {MDCRippleFoundation} from '@material/ripple/foundation';
import {MDCRippleAdapter} from '@material/ripple/adapter';
import {SpecificEventListener} from '@material/base/types';
import {mount} from 'enzyme';

import Button from '../../../packages/button';
import {withRipple, InjectedProps} from '../../../packages/ripple';
import {createMockRaf} from '../helpers/raf';
import {coerceForTesting} from '../helpers/types';

interface DivProps extends InjectedProps<HTMLDivElement> {
  children?: React.ReactNode;
  className: string;
  initRipple: React.Ref<HTMLDivElement>;
  unbounded: boolean;
}

const Div: React.FunctionComponent<DivProps> = ({
  children,
  className = '',
  initRipple,
  unbounded, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...otherProps
}) => {
  const classes = `ripple-test-component ${className}`;
  return (
    <div className={classes} ref={initRipple} {...otherProps}>
      {children}
    </div>
  );
};

const DivRipple = withRipple<DivProps, HTMLDivElement>(Div);

interface RippledComponent
  extends React.Component<InjectedProps<HTMLDivElement>> {
  foundation: MDCRippleFoundation;
  isComponentMounted: boolean;
}

function getAdapter(foundation: MDCRippleFoundation): MDCRippleAdapter {
  // @ts-ignore adapter_ property is marked as protected in mdc-web. We need to override this behaviour for testing
  return foundation.adapter_;
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
  const mouseDownHandler = coerceForTesting<React.MouseEventHandler>(td.func());
  const wrapper = mount<DivProps>(<DivRipple onMouseDown={mouseDownHandler} />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.activate = td.func<(evt?: Event) => void>();
  wrapper.simulate('mouseDown');
  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 1});
  td.verify(mouseDownHandler(td.matchers.isA(Object)), {times: 1});
  mockRaf.restore();
});

test('mouseDown sets isTouched to false if isTouched is true', () => {
  const mockRaf = createMockRaf();
  const mouseDownHandler = coerceForTesting<React.MouseEventHandler>(td.func());
  const wrapper = mount<DivProps>(<DivRipple onMouseDown={mouseDownHandler} />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.activate = td.func<(evt?: Event) => void>();
  (wrapper.instance() as any).isTouched = true;
  wrapper.simulate('mouseDown');

  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 0});
  assert.isFalse((wrapper.instance() as any).isTouched);
  mockRaf.restore();
});

test('mouseUp event triggers deactivateRipple', () => {
  const mouseUpHandler = coerceForTesting<React.MouseEventHandler>(td.func());
  const wrapper = mount<DivProps>(<DivRipple onMouseUp={mouseUpHandler} />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.deactivate = td.func<() => void>();
  wrapper.simulate('mouseUp');
  td.verify(foundation.deactivate(), {times: 1});
  td.verify(mouseUpHandler(td.matchers.isA(Object)), {times: 1});
});

test('mouseUp event triggers deactivateRipple with no onMouseUp handler', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.deactivate = td.func<() => void>();
  wrapper.simulate('mouseUp');
  td.verify(foundation.deactivate(), {times: 1});
});

test('touchStart event triggers activateRipple', () => {
  const mockRaf = createMockRaf();
  const touchStartHandler = coerceForTesting<React.TouchEventHandler>(
    td.func()
  );
  const wrapper = mount<DivProps>(
    <DivRipple onTouchStart={touchStartHandler} />
  );
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.activate = td.func<(evt?: Event) => void>();
  wrapper.simulate('touchStart');
  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 1});
  td.verify(touchStartHandler(td.matchers.isA(Object)), {times: 1});
  mockRaf.restore();
});

test('touchStart event triggers activateRipple with no onTouchStart handler', () => {
  const mockRaf = createMockRaf();
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.activate = td.func<(evt?: Event) => void>();
  wrapper.simulate('touchStart');
  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 1});
  mockRaf.restore();
});

test('touchEnd event triggers deactivateRipple', () => {
  const touchEndHandler = coerceForTesting<React.TouchEventHandler>(td.func());
  const wrapper = mount<DivProps>(<DivRipple onTouchEnd={touchEndHandler} />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.deactivate = td.func<() => void>();
  wrapper.simulate('touchEnd');
  td.verify(foundation.deactivate(), {times: 1});
  td.verify(touchEndHandler(td.matchers.isA(Object)), {times: 1});
});

test('touchEnd event triggers deactivateRipple with no onTouchEnd handler', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.deactivate = td.func<() => void>();
  wrapper.simulate('touchEnd');
  td.verify(foundation.deactivate(), {times: 1});
});

test('keyDown event triggers activateRipple', () => {
  const mockRaf = createMockRaf();
  const keyDownHandler = coerceForTesting<React.KeyboardEventHandler>(
    td.func()
  );
  const wrapper = mount<DivProps>(<DivRipple onKeyDown={keyDownHandler} />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.activate = td.func<(evt?: Event) => void>();
  wrapper.simulate('keyDown');
  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 1});
  td.verify(keyDownHandler(td.matchers.isA(Object)), {times: 1});
  mockRaf.restore();
});

test('keyDown event triggers activateRipple with no onKeyDown handler', () => {
  const mockRaf = createMockRaf();
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.activate = td.func<(evt?: Event) => void>();
  wrapper.simulate('keyDown');
  mockRaf.flush();
  td.verify(foundation.activate(td.matchers.isA(Object)), {times: 1});
  mockRaf.restore();
});

test('keyUp event triggers deactivateRipple', () => {
  const keyUpHandler = coerceForTesting<React.KeyboardEventHandler>(td.func());
  const wrapper = mount<DivProps>(<DivRipple onKeyUp={keyUpHandler} />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.deactivate = td.func<() => void>();
  wrapper.simulate('keyUp');
  td.verify(foundation.deactivate(), {times: 1});
  td.verify(keyUpHandler(td.matchers.isA(Object)), {times: 1});
});

test('keyUp event triggers deactivateRipple with no onKeyUp handler', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.deactivate = td.func<() => void>();
  wrapper.simulate('keyUp');
  td.verify(foundation.deactivate(), {times: 1});
});

test('focus event proxies to foundation focus handler', () => {
  const focusHandler = coerceForTesting<React.FocusEventHandler>(td.func());
  const wrapper = mount<DivProps>(<DivRipple onFocus={focusHandler} />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.handleFocus = td.func<() => void>();
  wrapper.simulate('focus');
  td.verify(foundation.handleFocus(), {times: 1});
  td.verify(focusHandler(td.matchers.isA(Object)), {times: 1});
});

test('focus event proxies to foundation focus handler with no onFocus handler', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.handleFocus = td.func<() => void>();
  wrapper.simulate('focus');
  td.verify(foundation.handleFocus(), {times: 1});
});

test('blur event proxies to foundation blur handler', () => {
  const blurHandler = coerceForTesting<React.FocusEventHandler>(td.func());
  const wrapper = mount<DivProps>(<DivRipple onBlur={blurHandler} />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.handleBlur = td.func<() => void>();
  wrapper.simulate('blur');
  td.verify(foundation.handleBlur(), {times: 1});
  td.verify(blurHandler(td.matchers.isA(Object)), {times: 1});
});

test('blur event proxies to foundation blur handler with no onBlur handler', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.handleBlur = td.func<() => void>();
  wrapper.simulate('blur');
  td.verify(foundation.handleBlur(), {times: 1});
});

test('#adapter.isUnbounded returns true is prop is set', () => {
  const wrapper = mount<DivProps>(<DivRipple unbounded />);
  assert.isTrue(
    getAdapter(
      coerceForTesting<RippledComponent>(wrapper.instance()).foundation
    ).isUnbounded()
  );
});

test('#adapter.isUnbounded returns false prop is not set', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  assert.isFalse(
    getAdapter(
      coerceForTesting<RippledComponent>(wrapper.instance()).foundation
    ).isUnbounded()
  );
});

test('#adapter.isSurfaceDisabled returns true is prop is set', () => {
  const wrapper = mount<DivProps>(<DivRipple disabled />);
  assert.isTrue(
    getAdapter(
      coerceForTesting<RippledComponent>(wrapper.instance()).foundation
    ).isSurfaceDisabled()
  );
});

test('#adapter.isSurfaceDisabled returns false prop is not set', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  assert.isFalse(
    getAdapter(
      coerceForTesting<RippledComponent>(wrapper.instance()).foundation
    ).isSurfaceDisabled()
  );
});

test('#adapter.addClass adds a class to the root element', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).addClass('test-class');
  assert.isTrue(
    wrapper
      .update()
      .find('.ripple-test-component')
      .hasClass('test-class')
  );
});

test('#adapter.addClass does not add class if isMounted is false', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  coerceForTesting<RippledComponent>(
    wrapper.instance()
  ).isComponentMounted = false;
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).addClass('test-class');
  assert.isFalse(
    wrapper
      .update()
      .find('.ripple-test-component')
      .hasClass('test-class')
  );
});

test('#adapter.removeClass removes a class to the root element', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).addClass('test-class');
  wrapper.update();
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).removeClass('test-class');
  assert.isFalse(
    wrapper
      .update()
      .find('.ripple-test-component')
      .hasClass('test-class')
  );
});

test('#adapter.removeClass removes a class to the root element', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).addClass('test-class');
  coerceForTesting<RippledComponent>(
    wrapper.instance()
  ).isComponentMounted = false;
  wrapper.update();
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).removeClass('test-class');
  assert.isTrue(
    wrapper
      .update()
      .find('.ripple-test-component')
      .hasClass('test-class')
  );
});

test('#adapter.updateCssVariable updates style', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).updateCssVariable('color', 'blue');
  assert.equal(wrapper.state().style.color, 'blue');
});

test('#adapter.updateCssVariable does not update style if isComponentMounted is false', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  coerceForTesting<RippledComponent>(
    wrapper.instance()
  ).isComponentMounted = false;
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).updateCssVariable('color', 'blue');
  assert.notEqual(wrapper.state().style.color, 'blue');
});

test('#adapter.registerDocumentInteractionHandler triggers handler on document scroll', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const testHandler = td.func<SpecificEventListener<'scroll'>>();
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).registerDocumentInteractionHandler('scroll', testHandler);
  const event = new UIEvent('scroll');
  document.documentElement.dispatchEvent(event);
  td.verify(testHandler(event), {times: 1});
});

test('#adapter.deregisterDocumentInteractionHandler does not trigger handler on document scroll', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const testHandler = td.func<SpecificEventListener<'scroll'>>();
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).registerDocumentInteractionHandler('scroll', testHandler);
  const event = new UIEvent('scroll');
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).deregisterDocumentInteractionHandler('scroll', testHandler);
  document.documentElement.dispatchEvent(event);
  td.verify(testHandler(event), {times: 0});
});

test('#adapter.registerResizeHandler triggers handler on window resize', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const testHandler = td.func<SpecificEventListener<'resize'>>();
  getAdapter(
    coerceForTesting<RippledComponent>(wrapper.instance()).foundation
  ).registerResizeHandler(testHandler);
  const event = new UIEvent('resize');
  window.dispatchEvent(event);
  td.verify(testHandler(event), {times: 1});
});
test(
  '#adapter.deregisterResizeHandler does not trigger handler ' +
    'after registering resize handler',
  () => {
    const wrapper = mount<DivProps>(<DivRipple />);
    const testHandler = td.func<SpecificEventListener<'resize'>>();
    getAdapter(
      coerceForTesting<RippledComponent>(wrapper.instance()).foundation
    ).registerResizeHandler(testHandler);
    const event = new UIEvent('resize');
    getAdapter(
      coerceForTesting<RippledComponent>(wrapper.instance()).foundation
    ).deregisterResizeHandler(testHandler);
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
    getAdapter(
      coerceForTesting<RippledComponent>(wrapper.update().instance()).foundation
    ).computeBoundingRect(),
    domRect
  );
});

test('#adapter.getWindowPageOffset returns height and width', () => {
  const wrapper = mount<DivProps>(<DivRipple />);
  const offset = {x: 0, y: 0};
  assert.deepEqual(
    getAdapter(
      coerceForTesting<RippledComponent>(wrapper.update().instance()).foundation
    ).getWindowPageOffset(),
    offset
  );
});

test('#componentWillUnmount destroys foundation', () => {
  const mockRaf = createMockRaf();
  const wrapper = mount<DivProps>(<DivRipple />);
  mockRaf.flush();
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.destroy = td.func<() => void>();
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
    assert.equal(
      coerceForTesting<HTMLSpanElement>(wrapper.getDOMNode()).innerText,
      'hi'
    );
    done();
  });
});

test('handleBlur is called when disabled is being true', () => {
  const wrapper = mount(<Button />);
  const foundation = coerceForTesting<RippledComponent>(wrapper.instance())
    .foundation;
  foundation.handleBlur = td.func<() => void>();
  wrapper.setProps({disabled: true});
  td.verify(foundation.handleBlur(), {times: 1});
});
