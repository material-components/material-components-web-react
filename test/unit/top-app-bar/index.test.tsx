import React from 'react';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import td from 'testdouble';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '../../../packages/top-app-bar/index';
import {withRipple, InjectedProps} from '../../../packages/ripple/index';
import {coerceForTesting} from '../helpers/types';

suite('TopAppBar');

interface ScrollState {
  scrollRef: React.RefObject<HTMLDivElement>;
  withRef: boolean;
}
interface ScrollProps {
  withRef: boolean;
}

class TopAppBarWithScroll extends React.Component<ScrollProps, ScrollState> {
  state: ScrollState = {
    scrollRef: React.createRef(),
    withRef: this.props.withRef,
  };

  static defaultProps: ScrollProps = {
    withRef: false,
  };

  withRef = () => this.setState({withRef: !this.state.withRef});

  render() {
    const {withRef, scrollRef} = this.state;
    return (
      <div>
        <TopAppBar scrollTarget={withRef ? scrollRef : undefined}>
          <TopAppBarRow>
            <TopAppBarSection>
              <TopAppBarTitle>Scroll</TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <div
          ref={this.state.scrollRef}
          style={{height: '1000px', overflow: 'auto'}}
        >
          <div style={{height: '3000px'}}>Scroll Target</div>
        </div>
      </div>
    );
  }
}

interface RippleProps<T> extends InjectedProps<T> {
  hasRipple?: boolean;
  className: string;
}

type ActionItemRippleProps = RippleProps<HTMLAnchorElement> &
  React.HTMLProps<HTMLAnchorElement>;

const ActionItem: React.FunctionComponent<ActionItemRippleProps> = ({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  initRipple,
  hasRipple,
  unbounded,
  className,
  ref,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  ...otherProps
}) => (
  <a
    href='#'
    ref={initRipple}
    className={`${className} test-action-icon-1`}
    {...otherProps}
  />
);

const RippledActionItem = withRipple<
  RippleProps<HTMLAnchorElement>,
  HTMLAnchorElement
>(ActionItem);

test('renders a TopAppBar with default tag', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  assert.equal(wrapper.type(), 'header');
});

test('renders a TopAppBar with custom tag', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar tag='div' />);
  assert.equal(wrapper.type(), 'div');
});

test('classNames adds classes', () => {
  const wrapper = shallow(<TopAppBar className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar'));
});

test('has correct standard class', () => {
  const wrapper = shallow(<TopAppBar />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar'));
});

test('has correct shortCollapsed class', () => {
  const wrapper = shallow(<TopAppBar shortCollapsed />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--short'));
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--short-collapsed'));
});

test('has correct short class', () => {
  const wrapper = shallow(<TopAppBar short />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--short'));
  assert.isFalse(wrapper.hasClass('mdc-top-app-bar--short-collapsed'));
});

test('has correct prominent class', () => {
  const wrapper = shallow(<TopAppBar prominent />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--prominent'));
});

test('has correct fixed class', () => {
  const wrapper = shallow(<TopAppBar fixed />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--fixed'));
});

test('has correct dense class', () => {
  const wrapper = shallow(<TopAppBar dense />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--dense'));
});

test('has correct prominent dense class', () => {
  const wrapper = shallow(<TopAppBar prominent dense />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--dense'));
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--prominent'));
});

test('top app bar style should be set by state', () => {
  const wrapper = mount(<TopAppBar />);
  wrapper.setState({style: {color: 'blue'}});
  assert.equal(
    coerceForTesting<HTMLElement>(wrapper.getDOMNode()).style.color,
    'blue'
  );
});

test('#componetDIdMount will set state scrollTarget if prop.scrollTarget exists', () => {
  const wrapper = mount<TopAppBarWithScroll>(<TopAppBarWithScroll withRef />);
  const topAppBar: TopAppBar = coerceForTesting<TopAppBar>(
    wrapper.find('TopAppBar').instance()
  );

  assert.isDefined(topAppBar.state.scrollTarget);
  assert.strictEqual(topAppBar.state.scrollTarget, wrapper.state().scrollRef);
});

test('Updating props.scrollTarget will set state scrollTarget', () => {
  const wrapper = mount<TopAppBarWithScroll>(<TopAppBarWithScroll />);
  const topAppBar: TopAppBar = coerceForTesting<TopAppBar>(
    wrapper.find('TopAppBar').instance()
  );
  assert.isUndefined(topAppBar.state.scrollTarget);
  wrapper.instance().withRef();

  assert.strictEqual(topAppBar.state.scrollTarget, wrapper.state().scrollRef);
});

test('Updating scrollTarget prop will call foundation method destroyScrollHandler', () => {
  const wrapper = mount<TopAppBarWithScroll>(<TopAppBarWithScroll />);
  const topAppBar: TopAppBar = coerceForTesting<TopAppBar>(
    wrapper.find('TopAppBar').instance()
  );
  const foundation = topAppBar.foundation;
  foundation.destroyScrollHandler = td.func<() => void>();
  wrapper.instance().withRef();

  td.verify(foundation.destroyScrollHandler(), {times: 1});
});

test('Updating scrollTarget prop will call foundation method initScrollHandler', () => {
  const wrapper = mount<TopAppBarWithScroll>(<TopAppBarWithScroll />);
  const topAppBar: TopAppBar = coerceForTesting<TopAppBar>(
    wrapper.find('TopAppBar').instance()
  );
  const foundation = topAppBar.foundation;
  foundation.initScrollHandler = td.func<() => void>();
  wrapper.instance().withRef();

  td.verify(foundation.initScrollHandler(), {times: 1});
});
test('#adapter.addClass adds a class to state', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  wrapper.instance().adapter.addClass('test-class-1');
  assert.isTrue(wrapper.state().classList.has('test-class-1'));
});

test('#adapter.removeClass removes classes from list', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  wrapper.instance().adapter.addClass('test-class-1');
  assert.isTrue(wrapper.state().classList.has('test-class-1'));
  wrapper.instance().adapter.removeClass('test-class-1');
  assert.isFalse(wrapper.state().classList.has('test-class-1'));
});

test('#adapter.hasClass returns true for an added className', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  wrapper.instance().adapter.addClass('test-class-1');
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class-1'));
});

test('#adapter.registerScrollHandler triggers handler on window scroll', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const testHandler = coerceForTesting<EventListener>(td.func());
  wrapper.instance().adapter.registerScrollHandler(testHandler);
  const event = new Event('scroll');
  window.dispatchEvent(event);
  td.verify(testHandler(event), {times: 1});
});

test('#adapter.registerScrollHandler triggers handler on scrollTarget scroll', () => {
  const wrapper = mount<TopAppBarWithScroll>(<TopAppBarWithScroll withRef />);
  const topAppBar: TopAppBar = coerceForTesting<TopAppBar>(
    wrapper.find('TopAppBar').instance()
  );
  const testHandler = coerceForTesting<EventListener>(td.func());
  topAppBar.adapter.registerScrollHandler(testHandler);
  const event = new Event('scroll');
  const scrollRef = wrapper.instance().state.scrollRef.current;
  scrollRef!.dispatchEvent(event);

  td.verify(testHandler(event), {times: 1});
});

test(
  '#adapter.deregisterScrollHandler does not trigger handler ' +
    'after deregistering scroll handler on window',
  () => {
    const wrapper = shallow<TopAppBar>(<TopAppBar />);
    const testHandler = coerceForTesting<EventListener>(td.func());
    wrapper.instance().adapter.registerScrollHandler(testHandler);
    const event = new Event('scroll');
    wrapper.instance().adapter.deregisterScrollHandler(testHandler);
    window.dispatchEvent(event);
    td.verify(testHandler(event), {times: 0});
  }
);

test(
  '#adapter.deregisterScrollHandler does not trigger handler ' +
    'after deregistering scroll handler on scrollTarget',
  () => {
    const wrapper = mount<TopAppBarWithScroll>(<TopAppBarWithScroll withRef />);
    const topAppBar: TopAppBar = coerceForTesting<TopAppBar>(
      wrapper.find('TopAppBar').instance()
    );
    const testHandler = coerceForTesting<EventListener>(td.func());
    topAppBar.adapter.registerScrollHandler(testHandler);
    const event = new Event('scroll');
    topAppBar.adapter.deregisterScrollHandler(testHandler);
    const scrollRef = wrapper.instance().state.scrollRef.current;
    scrollRef!.dispatchEvent(event);

    td.verify(testHandler(event), {times: 0});
  }
);

test('#adapter.getViewportScrollY returns same value with scrollTarget.scrollTop', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const wrapper = mount<TopAppBarWithScroll>(
    <TopAppBarWithScroll withRef={true} />,
    {attachTo: div}
  );
  const topAppBar: TopAppBar = coerceForTesting<TopAppBar>(
    wrapper.find('TopAppBar').instance()
  );
  const scrollTarget = topAppBar.state.scrollTarget!.current!;
  assert.equal(scrollTarget.scrollTop, topAppBar.adapter.getViewportScrollY());

  // https://github.com/material-components/material-components-web-react/pull/771
  // We commented out the code below because linux puppeteer version doesn't scroll.
  // const scrollY = 150;
  // scrollTarget.scrollTo(0, scrollY);
  // assert.equal(scrollY, topAppBar.adapter.getViewportScrollY());

  document.body.removeChild(div);
});

test('#adapter.getViewportScrollY test for changing scrollTarget', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const wrapper = mount<TopAppBarWithScroll>(
    <TopAppBarWithScroll withRef={false} />,
    {attachTo: div}
  );
  const topAppBar: TopAppBar = coerceForTesting<TopAppBar>(
    wrapper.find('TopAppBar').instance()
  );
  assert.equal(window.pageYOffset, topAppBar.adapter.getViewportScrollY());
  wrapper.setState({withRef: true});

  const scrollTarget = topAppBar.state.scrollTarget!.current!;
  assert.equal(scrollTarget.scrollTop, topAppBar.adapter.getViewportScrollY());
  document.body.removeChild(div);
});

test('#adapter.registerResizeHandler triggers handler on window resize', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const testHandler = coerceForTesting<EventListener>(td.func());
  wrapper.instance().adapter.registerResizeHandler(testHandler);
  const event = new Event('resize');
  window.dispatchEvent(event);
  td.verify(testHandler(event), {times: 1});
});

test(
  '#adapter.registerResizeHandler does not trigger handler ' +
    'after deregistering scroll handler on window',
  () => {
    const wrapper = shallow<TopAppBar>(<TopAppBar />);
    const testHandler = coerceForTesting<EventListener>(td.func());
    wrapper.instance().adapter.registerResizeHandler(testHandler);
    const event = new Event('resize');
    wrapper.instance().adapter.deregisterResizeHandler(testHandler);
    window.dispatchEvent(event);
    td.verify(testHandler(event), {times: 0});
  }
);

test('#adapter.getTotalActionItems returns one with one actionItem passed', () => {
  const wrapper = mount<TopAppBar>(
    <TopAppBar>
      <TopAppBarRow>
        <TopAppBarSection>
          <TopAppBarIcon actionItem>
            <RippledActionItem />
          </TopAppBarIcon>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
  assert.strictEqual(wrapper.instance().adapter.getTotalActionItems(), 1);
});

test('#adapter.getTotalActionItems returns three with three actionItems passed', () => {
  const wrapper = mount<TopAppBar>(
    <TopAppBar>
      <TopAppBarRow>
        <TopAppBarSection>
          <TopAppBarIcon actionItem>
            <RippledActionItem />
          </TopAppBarIcon>
          <TopAppBarIcon actionItem>
            <RippledActionItem />
          </TopAppBarIcon>
          <TopAppBarIcon actionItem>
            <RippledActionItem />
          </TopAppBarIcon>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
  assert.strictEqual(wrapper.instance().adapter.getTotalActionItems(), 3);
});

test('#adapter.getTotalActionItems returns zero with no actionItem passed', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  assert.strictEqual(wrapper.instance().adapter.getTotalActionItems(), 0);
});

test('#adapter.setStyle should update state', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  wrapper.instance().adapter.setStyle('display', 'block');
  assert.equal(wrapper.state().style.display, 'block');
});

test('#adapter.getTopAppBarHeight should return clientHeight', () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.appendChild(div);
  const options = {attachTo: div};
  const wrapper = mount<TopAppBar>(
    <TopAppBar>
      <TopAppBarRow>
        <TopAppBarSection>
          <TopAppBarTitle>Test</TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>,
    options
  );
  const topAppBarHeight = wrapper.instance().adapter.getTopAppBarHeight();
  const realDOMHeight = wrapper.getDOMNode().clientHeight;
  assert.equal(topAppBarHeight, realDOMHeight);
  document.body.removeChild(div);
});

test('when changes from short to fixed the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar short />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: true, short: false});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from short to fixed the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar short />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: true, short: false});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from short to standard the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar short />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({short: false});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from short to prominent the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar short />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({short: false, prominent: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from short to shortCollpased the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar short />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({shortCollapsed: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from fixed to prominent the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar fixed />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: false, prominent: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from fixed to short the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar fixed />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: false, short: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from fixed to shortCollpased the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar fixed />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: false, shortCollapsed: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from fixed to standard the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar fixed />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: false});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from standard to fixed the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({fixed: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from standard to short the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({short: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when changes from standard to shortCollapsed the foundation changes', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({shortCollapsed: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test(
  'when changes from standard to prominent the foundation does not ' + 'change',
  () => {
    const wrapper = shallow<TopAppBar>(<TopAppBar />);
    const originalFoundation = wrapper.instance().foundation;
    wrapper.setProps({prominent: true});
    assert.equal(wrapper.instance().foundation, originalFoundation);
    assert.exists(wrapper.instance().foundation);
  }
);

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<TopAppBar>(<TopAppBar />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

test('have remaining props', () => {
  const wrapper = shallow(
    <TopAppBar id='identifier' className='classes' data='secret' />
  );
  const props = wrapper.props();
  assert.isTrue(
    props.id === 'identifier' &&
      props.data === 'secret' &&
      wrapper.hasClass('classes')
  );
});
