import React from 'react';

import {assert} from 'chai';
import td from 'testdouble';
import {shallow, mount} from 'enzyme';
import Dialog, {
  ChildTypes,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '../../../packages/dialog';
import {isScrollable, areTopsMisaligned} from '@material/dialog/util';
import {cssClasses, LAYOUT_EVENTS} from '../../../packages/dialog/constants';
import {coerceForTesting} from '../helpers/types';
import {FocusTrap} from 'focus-trap';

const DialogStub = (
  <Dialog>
    <DialogContent>
      <p>meowkay</p>
    </DialogContent>
    <DialogFooter>
      <DialogButton action='dismiss'>Dismiss</DialogButton>
      <DialogButton action='accept'>Accept</DialogButton>
    </DialogFooter>
  </Dialog>
);

suite('Dialog');

const getAdapter = (instance: Dialog) => {
  // @ts-ignore adapter_ property is protection, we need to override it for testing purposes
  return instance.foundation.adapter_;
};

test('renders a dialog with default tag', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  assert.equal(wrapper.type(), 'div');
});

test('renders a dialog with custom tag', () => {
  const wrapper = shallow<Dialog>(<Dialog tag='dialog' />);
  assert.equal(wrapper.type(), 'dialog');
});

test('creates foundation', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  assert.exists(wrapper.instance().foundation);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

test('renders a dialog with foundation.autoStackButtons set to true', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  assert.isTrue(wrapper.instance().foundation.getAutoStackButtons());
});

test('#componentDidMount sets #foundaiton.autoStackButtons to false if prop false', () => {
  const wrapper = shallow<Dialog>(<Dialog autoStackButtons={false} />);
  assert.isFalse(wrapper.instance().foundation.getAutoStackButtons());
});

test('renders a dialog with foundation.setEscapeKeyAction set to foundation default', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  assert.strictEqual(
    wrapper.instance().foundation.getEscapeKeyAction(),
    'close'
  );
});

test('#componentDidMount calls #foundaiton.setEscapeKeyAction if prop present', () => {
  const escapeKeyAction: string = 'meow';
  const wrapper = shallow<Dialog>(<Dialog escapeKeyAction={escapeKeyAction} />);
  assert.strictEqual(
    wrapper.instance().foundation.getEscapeKeyAction(),
    escapeKeyAction
  );
});

test('renders a dialog with foundation.setScrimClickAction set to foundation default', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  assert.strictEqual(
    wrapper.instance().foundation.getScrimClickAction(),
    'close'
  );
});

test('#componentDidMount calls #foundaiton.setScrimClickAction if prop present', () => {
  const scrimClickAction: string = 'meow';
  const wrapper = shallow<Dialog>(
    <Dialog scrimClickAction={scrimClickAction} />
  );
  assert.strictEqual(
    wrapper.instance().foundation.getScrimClickAction(),
    scrimClickAction
  );
});

test('when props.open updates to true, #foundation.open is called ', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  wrapper.instance().foundation.open = td.func<() => void>();
  wrapper.setProps({open: true});
  td.verify(wrapper.instance().foundation.open(), {times: 1});
});

test('when props.open updates to false from true, #foundation.close is called ', () => {
  const wrapper = shallow<Dialog>(<Dialog open />);
  wrapper.instance().foundation.close = td.func<(action: string) => null>();
  wrapper.setProps({open: false});
  td.verify(wrapper.instance().foundation.close(), {times: 1});
});

test(
  'when props.autoStackButtons updates to true,  ' +
    ' #foundation.setAutoStackButtons is called ',
  () => {
    const wrapper = shallow<Dialog>(<Dialog autoStackButtons={false} />);
    assert.isFalse(wrapper.instance().foundation.getAutoStackButtons());
    wrapper.instance().foundation.setAutoStackButtons = td.func<
      (autoStack: boolean) => null
    >();
    wrapper.setProps({autoStackButtons: true});
    td.verify(wrapper.instance().foundation.setAutoStackButtons(true), {
      times: 1,
    });
  }
);

test(
  'when props.autoStackButtons updates to false, ' +
    ' #foundation.setAutoStackButtons is called ',
  () => {
    const wrapper = shallow<Dialog>(<Dialog />);
    assert.isTrue(wrapper.instance().foundation.getAutoStackButtons());
    wrapper.instance().foundation.setAutoStackButtons = td.func<
      (autoStack: boolean) => null
    >();
    wrapper.setProps({autoStackButtons: false});
    td.verify(wrapper.instance().foundation.setAutoStackButtons(false), {
      times: 1,
    });
  }
);

test('when props.escapeKeyAction updates #foundation.setEscapeKeyAction is called', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  const escapeKeyAction: string = 'meow';

  wrapper.instance().foundation.setEscapeKeyAction = td.func<
    (action: string) => null
  >();
  wrapper.setProps({escapeKeyAction});
  td.verify(wrapper.instance().foundation.setEscapeKeyAction(escapeKeyAction), {
    times: 1,
  });
});

test('when props.scrimClickAction updates #foundation.setScrimClickAction is called', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  const scrimClickAction: string = 'meow';

  wrapper.instance().foundation.setScrimClickAction = td.func<
    (action: string) => null
  >();
  wrapper.setProps({scrimClickAction});
  td.verify(
    wrapper.instance().foundation.setScrimClickAction(scrimClickAction),
    {times: 1}
  );
});

test('component has default @id', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  assert.equal('mdc-dialog', wrapper.prop('id'));
});

test('component will set a custom @id', () => {
  const customId = 'my-custom-dialog';
  const wrapper = shallow<Dialog>(<Dialog id={customId} />);
  assert.equal(customId, wrapper.prop('id'));
});

test('component has aria-modal set to true', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  assert.isTrue(wrapper.prop('aria-modal'));
});

test('classNames adds classes', () => {
  const wrapper = shallow<Dialog>(<Dialog className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass(cssClasses.BASE));
});

test('#adapter.addClass should update state with new className', () => {
  const wrapper = mount<Dialog>(<Dialog />);
  getAdapter(wrapper.instance()).addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass should update state with new className', () => {
  const wrapper = mount<Dialog>(<Dialog />);
  wrapper.setState({classList: new Set(['test-class'])});
  getAdapter(wrapper.instance()).removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.hasClass returns true if class is contained in classes', () => {
  const wrapper = mount<Dialog>(<Dialog />);
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(getAdapter(wrapper.instance()).hasClass('test-class'));
});

test('#adapter.addBodyClass adds a class to the body', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  getAdapter(wrapper.instance()).addBodyClass('test-class');
  const body = document.querySelector('body')!;
  assert.isTrue(body.classList.contains('test-class'));
});

test('#adapter.removeBodyClass adds a class to the body', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  const body = document.querySelector('body')!;

  body.classList.add('test-class');
  assert.isTrue(body.classList.contains('test-class'));
  wrapper.instance().adapter.removeBodyClass('test-class');
  assert.isFalse(body.classList.contains('test-class'));
});

test('#adapter.eventTargetMatchesSelector matches a selector passed as argument', () => {
  const wrapper = shallow<Dialog>(<Dialog />);
  const target = document.createElement('div');
  target.classList.add('test-class');
  const eventTargetMatchesSelector = wrapper
    .instance()
    .adapter.eventTargetMatches(target, '.test-class');

  assert.isTrue(eventTargetMatchesSelector);
});

test('#adapter.trapFocus calls focusTrap.activate', () => {
  const wrapper = mount<Dialog>(DialogStub);
  const activate = td.func();

  wrapper.instance().focusTrap = coerceForTesting<FocusTrap>({activate});
  wrapper.instance().adapter.trapFocus();
  td.verify(activate(), {times: 1});
});

test('#adapter.releaseFocus calls focusTrap.deactivate ', () => {
  const wrapper = shallow<Dialog>(DialogStub);
  const deactivate = td.func();

  wrapper.instance().focusTrap = coerceForTesting<FocusTrap>({deactivate});
  wrapper.instance().adapter.releaseFocus();
  td.verify(deactivate(), {times: 1});
});

test('#adapter.isContentScrollable returns false when there is no content', () => {
  const wrapper = mount<Dialog>(<Dialog />);
  assert.isFalse(wrapper.instance().adapter.isContentScrollable());
});

test('#adapter.isContentScrollable returns the value of util.isScrollable', () => {
  const wrapper = mount<Dialog>(
    <Dialog open>
      <DialogContent>
        <p>meowkay</p>
      </DialogContent>
    </Dialog>
  );
  const content = wrapper.instance().content;
  assert.strictEqual(
    wrapper.instance().adapter.isContentScrollable(),
    isScrollable(content)
  );
});

test('#adapter.areButtonsStacked returns result of util.areTopsMisaligned', () => {
  const wrapper = mount<Dialog>(DialogStub);
  const buttons = wrapper.instance().buttons;
  assert.strictEqual(
    wrapper.instance().adapter.areButtonsStacked(),
    areTopsMisaligned(buttons)
  );
});

test('#adapter.getActionFromEvent returns attribute value on event target', () => {
  const wrapper = mount<Dialog>(DialogStub);

  const buttons = wrapper.instance().buttons!;
  const action = wrapper
    .instance()
    .adapter.getActionFromEvent(coerceForTesting<Event>({target: buttons[1]}));
  assert.equal(action, 'accept');
});

test('#adapter.getActionFromEvent returns attribute value on parent of event target', () => {
  const wrapper = mount<Dialog>(
    <Dialog>
      <DialogContent>
        <ul className='mdc-list mdc-list--avatar-list'>
          <li className='mdc-list-item' data-mdc-dialog-action='pet'>
            <i className='mdc-list-item__graphic material-icons'>pets</i>
            <span>Cat</span>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );

  const spanEl = wrapper.instance().content!.getElementsByTagName('span')[0];
  const action = wrapper
    .instance()
    .adapter.getActionFromEvent(coerceForTesting<Event>({target: spanEl}));
  assert.equal(action, 'pet');
});

test('#adapter.getActionFromEvent returns null when attribute is not present', () => {
  const wrapper = mount<Dialog>(
    <Dialog>
      <DialogContent>
        <ul className='mdc-list mdc-list--avatar-list'>
          <li className='mdc-list-item'>
            <i className='mdc-list-item__graphic material-icons'>pets</i>
            <span>Cat</span>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );

  const spanEl = wrapper.instance().content!.getElementsByTagName('span')[0];
  const action = wrapper
    .instance()
    .adapter.getActionFromEvent(coerceForTesting<Event>({target: spanEl}));
  assert.isNull(action);
});

test(`#adapter.clickDefaultButton invokes click() on button matching ${cssClasses.DEFAULT_BUTTON}`, () => {
  const wrapper = mount<Dialog>(
    <Dialog>
      <DialogContent>
        <p>meowkay</p>
      </DialogContent>
      <DialogFooter>
        <DialogButton action='dismiss'>Dismiss</DialogButton>
        <DialogButton action='accept' isDefault>
          Accept
        </DialogButton>
      </DialogFooter>
    </Dialog>
  );
  const defaultButton = wrapper.instance().defaultButton!;

  defaultButton.click = coerceForTesting<() => void>(td.func('click'));
  wrapper.instance().adapter.clickDefaultButton();
  td.verify(defaultButton.click(), {times: 1});
});

test(`#adapter.clickDefaultButton does nothing if no button matches ${cssClasses.DEFAULT_BUTTON}`, () => {
  const wrapper = mount<Dialog>(DialogStub);
  const buttons = wrapper.instance().buttons!;
  buttons.map(
    (button) => (button.click = coerceForTesting<() => void>(td.func('click')))
  );
  wrapper.instance().adapter.clickDefaultButton();
  buttons.map((button) => td.verify(button.click(), {times: 0}));
});

test('#adapter.reverseButtons reverses the order of children under the actions element', () => {
  const acceptButton = <DialogButton action='accept'>Accept</DialogButton>;
  const dismissButton = <DialogButton action='dismiss'>Dismiss</DialogButton>;
  const wrapper = mount<Dialog>(
    <Dialog>
      <DialogContent>
        <p>meowkay</p>
      </DialogContent>
      <DialogFooter>
        {acceptButton}
        {dismissButton}
      </DialogFooter>
    </Dialog>
  );

  const buttons = wrapper.instance().buttons;
  wrapper.instance().adapter.reverseButtons();
  assert.sameOrderedMembers(buttons.reverse(), wrapper.instance().buttons);
});

test('#adapter.notifyOpening calls props.onOpening', () => {
  const onOpening = coerceForTesting<() => void>(td.func());
  const wrapper = shallow<Dialog>(<Dialog onOpening={onOpening} />);
  wrapper.instance().adapter.notifyOpening();
  td.verify(onOpening(), {times: 1});
});

test('#adapter.notifyOpened calls props.onOpen', () => {
  const onOpen = coerceForTesting<() => void>(td.func());
  const wrapper = shallow<Dialog>(<Dialog onOpen={onOpen} />);
  wrapper.instance().adapter.notifyOpened();
  td.verify(onOpen(), {times: 1});
});

test('#adapter.notifyClosing calls props.onClosing', () => {
  const onClosing = coerceForTesting<(action: string) => void>(td.func());
  const wrapper = shallow<Dialog>(<Dialog onClosing={onClosing} />);
  wrapper.instance().adapter.notifyClosing('close');
  td.verify(onClosing('close'), {times: 1});
});

test('#adapter.notifyClosed calls props.onClose', () => {
  const onClose = coerceForTesting<(action: string) => void>(td.func());
  const wrapper = shallow<Dialog>(<Dialog onClose={onClose} />);
  wrapper.instance().adapter.notifyClosed('close');
  td.verify(onClose('close'), {times: 1});
});

test(
  '#handleOpening adds keydown handler on document that triggers ' +
    '#foundation.handleDocumentKeyDown',
  () => {
    const wrapper = shallow<Dialog>(<Dialog open={false} />);
    wrapper.instance().foundation.handleDocumentKeydown = td.func<
      (evt: KeyboardEvent) => null
    >();

    const e = new KeyboardEvent('keydown');

    document.dispatchEvent(e);
    td.verify(wrapper.instance().foundation.handleDocumentKeydown(e), {
      times: 0,
    });

    wrapper.instance().handleOpening();
    document.dispatchEvent(e);
    td.verify(wrapper.instance().foundation.handleDocumentKeydown(e), {
      times: 1,
    });
  }
);

test('#handleOpening adds handler for LAYOUT_EVENTS to window', () => {
  const wrapper = shallow<Dialog>(<Dialog open={false} />);
  wrapper.instance().handleLayout = coerceForTesting<() => void>(td.func());
  wrapper.instance().handleOpening();

  LAYOUT_EVENTS.forEach((eventType: string) => {
    const evt = new Event(eventType);
    window.dispatchEvent(evt);
    // @ts-ignore expected 0 arguments but got 1 -- evt will always be passed
    td.verify(wrapper.instance().handleLayout(evt), {times: 1});
  });
});

test(
  '#handleClosing removes keydown handler on document that triggers ' +
    '#foundation.handleDocumentKeyDown',
  () => {
    const wrapper = shallow<Dialog>(<Dialog open={false} />);
    wrapper.instance().foundation.handleDocumentKeydown = coerceForTesting<
      (evt: KeyboardEvent) => void
    >(td.func());
    wrapper.instance().handleOpening();

    const e = new KeyboardEvent('keydown');
    document.dispatchEvent(e);
    td.verify(wrapper.instance().foundation.handleDocumentKeydown(e), {
      times: 1,
    });

    wrapper.instance().foundation.handleDocumentKeydown = coerceForTesting<
      (evt: KeyboardEvent) => void
    >(td.func());
    wrapper.instance().handleClosing('close');
    document.dispatchEvent(e);
    td.verify(wrapper.instance().foundation.handleDocumentKeydown(e), {
      times: 0,
    });
  }
);

test('#handleClosing removes handler for LAYOUT_EVENTS to window', () => {
  const wrapper = shallow<Dialog>(<Dialog open={false} />);
  wrapper.instance().handleLayout = coerceForTesting<(evt?: Event) => void>(
    td.func()
  );
  wrapper.instance().handleOpening();

  LAYOUT_EVENTS.forEach((eventType) => {
    const evt = new KeyboardEvent(eventType);
    window.dispatchEvent(evt);
    // @ts-ignore expected 0 arguments but got 1
    td.verify(wrapper.instance().handleLayout(evt), {times: 1});
  });

  wrapper.instance().handleClosing('close');

  LAYOUT_EVENTS.forEach((eventType) => {
    const evt = new Event(eventType);
    window.dispatchEvent(evt);
    // @ts-ignore expected 0 arguments but got 1
    td.verify(wrapper.instance().handleLayout(evt), {times: 0});
  });
});

test('#renderContainer returns undefined if no children', () => {
  const wrapper = shallow<Dialog>(<Dialog />);

  const container = wrapper.instance().renderContainer(undefined);

  assert.isUndefined(container);
});

test('#renderContainer renders container if children present', () => {
  const wrapper = shallow<Dialog>(
    <Dialog>
      <DialogTitle>Test</DialogTitle>
      <DialogContent>
        <p>Meowkay</p>
      </DialogContent>
    </Dialog>
  );
  wrapper.instance().renderChild = coerceForTesting<
    (child: ChildTypes, i?: number) => ChildTypes
  >(td.func());
  const children: ChildTypes[] = wrapper.instance().props
    .children as ChildTypes[];
  const container = wrapper.instance().renderContainer(children);

  assert.isDefined(container);
  assert.equal(container!.props.className, cssClasses.CONTAINER);
  children.forEach((child: ChildTypes, i: number) =>
    td.verify(wrapper.instance().renderChild(child, i), {times: 1})
  );
});

test('#renderChild will call setId if DialogTitle', () => {
  const title = <DialogTitle>Test</DialogTitle>;
  const wrapper = shallow<Dialog>(<Dialog>{title}</Dialog>);

  wrapper.instance().setId = coerceForTesting<
    (name: ChildTypes, componentId?: string) => string
  >(td.func());
  wrapper.instance().renderChild(title, 0);
  td.verify(wrapper.instance().setId(title, undefined), {times: 1});
});

test('#renderChild will call setId if DialogContent', () => {
  const content = (
    <DialogContent id='your-pet-cat'>
      <p>Meow</p>
    </DialogContent>
  );
  const wrapper = shallow<Dialog>(<Dialog>{content}</Dialog>);

  wrapper.instance().setId = coerceForTesting<
    (name: ChildTypes, componentId?: string) => string
  >(td.func());
  wrapper.instance().renderChild(content, 1);
  td.verify(wrapper.instance().setId(content, 'your-pet-cat'), {times: 1});
});

test('#renderChild will not call setId if !DialogTitle || !DialogContent', () => {
  const footer = <DialogFooter>Test</DialogFooter>;
  const wrapper = shallow<Dialog>(<Dialog>{footer}</Dialog>);

  wrapper.instance().setId = coerceForTesting<
    (name: ChildTypes, componentId?: string) => string
  >(td.func());
  wrapper.instance().renderChild(footer, 2);
  td.verify(wrapper.instance().setId(footer), {times: 0});
});

test('#setId will set labelledby and a id on DialogTitle if not present', () => {
  const wrapper = mount<Dialog>(
    <Dialog>
      <DialogTitle>Test</DialogTitle>
    </Dialog>
  );
  const dialog = wrapper.instance().dialogElement.current;

  const labelledby = dialog!.getAttribute('aria-labelledby');
  const title = dialog!.getElementsByClassName(cssClasses.TITLE)[0];

  assert.equal(labelledby, title.id);
});

test('#setId will set labelledby and from a custom DialogTitle', () => {
  const customId = 'custom-id';
  const wrapper = mount<Dialog>(
    <Dialog>
      <DialogTitle id={customId}>Test</DialogTitle>
    </Dialog>
  );
  const dialog = wrapper.instance().dialogElement.current;
  const labelledby = dialog!.getAttribute('aria-labelledby');
  const title = dialog!.getElementsByClassName(cssClasses.TITLE)[0];

  assert.equal(labelledby, customId);
  assert.equal(labelledby, title.id);
});

test('#events.onKeyDown triggers #foundaiton.handleInteraction', () => {
  const wrapper = shallow<Dialog>(
    <Dialog>
      <DialogContent>
        <p>meow</p>
      </DialogContent>
    </Dialog>
  );

  wrapper.instance().foundation.handleInteraction = td.func<
    (e: KeyboardEvent) => null
  >();
  const e = coerceForTesting<React.KeyboardEvent>({
    nativeEvent: {},
  });
  wrapper.simulate('keydown', e);
  td.verify(wrapper.instance().foundation.handleInteraction(e.nativeEvent), {
    times: 1,
  });
});

test('#events.onClick triggers #foundaiton.handleInteraction', () => {
  const wrapper = shallow<Dialog>(
    <Dialog>
      <DialogContent>
        <p>meow</p>
      </DialogContent>
    </Dialog>
  );

  wrapper.instance().foundation.handleInteraction = td.func<
    (e: KeyboardEvent) => null
  >();
  const e = coerceForTesting<React.KeyboardEvent>({
    nativeEvent: {},
  });
  wrapper.simulate('click', e);
  td.verify(wrapper.instance().foundation.handleInteraction(e.nativeEvent), {
    times: 1,
  });
});

test('Dialog closes when esc key is pressed', () => {
  const wrapper = mount<Dialog>(<Dialog open={true} />);
  assert.isTrue(wrapper.instance().foundation.isOpen());

  const e = new KeyboardEvent('keydown', {key: 'Escape'});
  document.dispatchEvent(e);
  assert.isFalse(wrapper.instance().foundation.isOpen());
});

test('Dialog does not close when esc key is pressed if escapeKeyAction set to empty string', () => {
  const wrapper = mount<Dialog>(<Dialog open={true} escapeKeyAction='' />);
  assert.isTrue(wrapper.instance().foundation.isOpen());

  const e = new KeyboardEvent('keydown', {key: 'Escape'});
  document.dispatchEvent(e);
  assert.isTrue(wrapper.instance().foundation.isOpen());
});

test('Dialog closes when scrim is clicked', () => {
  const wrapper = mount<Dialog>(<Dialog open={true} />);
  assert.isTrue(wrapper.instance().foundation.isOpen());

  wrapper.find(`.${cssClasses.SCRIM}`).simulate('click');
  assert.isFalse(wrapper.instance().foundation.isOpen());
});

test('Dialog does not close when scrim is clicked if scrimClickAction set to empty string', () => {
  const wrapper = mount<Dialog>(<Dialog open scrimClickAction={''} />);
  assert.isTrue(wrapper.instance().foundation.isOpen());

  wrapper.find(`.${cssClasses.SCRIM}`).simulate('click');
  assert.isTrue(wrapper.instance().foundation.isOpen());
});
