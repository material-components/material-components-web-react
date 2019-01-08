import React from 'react';

import {assert} from 'chai';
import td from 'testdouble';
import {shallow, mount} from 'enzyme';
import Dialog, {DialogTitle, DialogContent, DialogFooter, DialogButton} from '../../../packages/dialog';
import {util} from '@material/dialog/dist/mdc.dialog';
import {cssClasses, LAYOUT_EVENTS} from '../../../packages/dialog/constants';

suite('Dialog');

test('creates foundation', () => {
  const wrapper = shallow(<Dialog />);
  assert.exists(wrapper.instance().foundation_);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<Dialog />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});


test('renders a dialog with default tag', () => {
  const wrapper = shallow(<Dialog />);
  assert.equal(wrapper.type(), 'div');
});

test('renders a dialog with custom tag', () => {
  const wrapper = shallow(<Dialog tag='dialog' />);
  assert.equal(wrapper.type(), 'dialog');
});

test('when props.open updates to true, #foundation.open is called ', () => {
  const wrapper = shallow(<Dialog />);
  wrapper.instance().foundation_.open = td.func();
  wrapper.setProps({open: true});
  td.verify(wrapper.instance().foundation_.open(), {times: 1});
});

test('when props.open updates to false from true, #foundation.close is called ', () => {
  const wrapper = shallow(<Dialog open />);
  wrapper.instance().foundation_.close = td.func();
  wrapper.setProps({open: false});
  td.verify(wrapper.instance().foundation_.close(), {times: 1});
});

test('when props.autoStackButtons updates to true,  ' +
  ' #foundation.setAutoStackButtons is called ', () => {
  const wrapper = shallow(<Dialog autoStackButtons={false}/>);
  assert.isFalse(wrapper.instance().foundation_.getAutoStackButtons());
  wrapper.instance().foundation_.setAutoStackButtons = td.func();
  wrapper.setProps({autoStackButtons: true});
  td.verify(wrapper.instance().foundation_.setAutoStackButtons(true), {times: 1});
});

test('when props.autoStackButtons updates to false, ' +
  ' #foundation.setAutoStackButtons is called ', () => {
  const wrapper = shallow(<Dialog />);
  assert.isTrue(wrapper.instance().foundation_.getAutoStackButtons());
  wrapper.instance().foundation_.setAutoStackButtons = td.func();
  wrapper.setProps({autoStackButtons: false});
  td.verify(wrapper.instance().foundation_.setAutoStackButtons(false), {times: 1});
});

test('classNames adds classes', () => {
  const wrapper = shallow(<Dialog className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-dialog'));
});

test('component has default @id', () => {
  const wrapper = shallow(<Dialog />);
  assert.equal('mdc-dialog', wrapper.prop('id'));
});

test('component will set a custom @id', () => {
  const customId = 'my-custom-dialog';
  const wrapper = shallow(<Dialog id={customId} />);
  assert.equal(customId, wrapper.prop('id'));
});


test('#adapter.addClass should update state with new className', () => {
  const wrapper = mount(<Dialog />);
  wrapper.instance().foundation_.adapter_.addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass should update state with new className', () => {
  const wrapper = mount(<Dialog />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.instance().foundation_.adapter_.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.hasClass returns true if class is contained in classes', () => {
  const wrapper = mount(<Dialog />);
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.instance().foundation_.adapter_.hasClass('test-class'));
});

test('#adapter.addBodyClass adds a class to the body', () => {
  const wrapper = shallow(<Dialog />);
  wrapper.instance().foundation_.adapter_.addBodyClass('test-class');
  assert.isTrue(document.querySelector('body').classList.contains('test-class'));
});

test('#adapter.removeBodyClass adds a class to the body', () => {
  const wrapper = shallow(<Dialog />);
  const body = document.querySelector('body');

  body.classList.add('test-class');
  assert.isTrue(body.classList.contains('test-class'));
  wrapper.instance().adapter.removeBodyClass('test-class');
  assert.isFalse(body.classList.contains('test-class'));
});


test('#adapter.eventTargetMatchesSelector matches a selector passed as argument', () => {
  const wrapper = shallow(<Dialog />);
  const target = document.createElement('div');
  target.classList.add('test-class');
  const eventTargetMatchesSelector
    = wrapper.instance().adapter.eventTargetMatches(target, '.test-class');
  assert.isTrue(eventTargetMatchesSelector);
});

test('#adapter.trapFocus calls focusTrap.activate', () => {
  const wrapper = shallow(<Dialog/>);
  const activate = td.func();
  wrapper.instance().focusTrap_ = {activate};
  wrapper.instance().adapter.trapFocus();
  td.verify(activate(), {times: 1});
});

test('#adapter.releaseFocus calls focusTrap.deactivate ', () => {
  const wrapper = shallow(<Dialog />);
  const deactivate = td.func();
  wrapper.instance().focusTrap_ = {deactivate};
  wrapper.instance().adapter.releaseFocus();
  td.verify(deactivate(), {times: 1});
});

test('#adapter.isContentScrollable returns false when there is no content', () => {
  const wrapper = mount(<Dialog />);
  assert.isFalse(wrapper.instance().adapter.isContentScrollable());
});

test('#adapter.isContentScrollable returns the value of util.isScrollable', () => {
  const wrapper = mount(
    <Dialog open><DialogContent><p>meowkay</p></DialogContent></Dialog>
  );
  const content = wrapper.instance().content_;
  assert.strictEqual(
    wrapper.instance().adapter.isContentScrollable(), util.isScrollable(content)
  );
});

test('#adapter.areButtonsStacked returns result of util.areTopsMisaligned', () => {
  const wrapper = mount(
    <Dialog>
      <DialogContent><p>meowkay</p></DialogContent>
      <DialogFooter>
       <DialogButton action="dismiss">Dismiss</DialogButton>
       <DialogButton action="accept">Accept</DialogButton>
      </DialogFooter>
    </Dialog>
  );
  const buttons = wrapper.instance().buttons_;
  assert.strictEqual(
    wrapper.instance().adapter.areButtonsStacked(),
    util.areTopsMisaligned(buttons)
  );
});


test('#adapter.getActionFromEvent returns attribute value on event target', () => {
  const wrapper = mount(
    <Dialog>
      <DialogContent><p>meowkay</p></DialogContent>
      <DialogFooter>
       <DialogButton action="dismiss">Dismiss</DialogButton>
       <DialogButton action="accept">Accept</DialogButton>
      </DialogFooter>
    </Dialog>
  );

  const buttons = wrapper.instance().buttons_;
  const action = wrapper.instance().adapter.getActionFromEvent({target: buttons[1]});
  assert.equal(action, 'accept');
});

test('#adapter.getActionFromEvent returns attribute value on parent of event target', () => {
  const wrapper = mount(
    <Dialog>
      <DialogContent>
        <ul className="mdc-list mdc-list--avatar-list">
          <li className="mdc-list-item" data-mdc-dialog-action="pet">
            <i className="mdc-list-item__graphc material-icons">pets</i>
            <span>Cat</span>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );

  const spanEl = wrapper.instance().content_.getElementsByTagName('span')[0];
  const action = wrapper.instance().adapter.getActionFromEvent({target: spanEl});
  assert.equal(action, 'pet');
});


test('#adapter.getActionFromEvent returns null when attribute is not present', () => {
  const wrapper = mount(
    <Dialog>
      <DialogContent>
        <ul className="mdc-list mdc-list--avatar-list">
          <li className="mdc-list-item">
            <i className="mdc-list-item__graphc material-icons">pets</i>
            <span>Cat</span>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );

  const spanEl = wrapper.instance().content_.getElementsByTagName('span')[0];
  const action = wrapper.instance().adapter.getActionFromEvent({target: spanEl});
  assert.isNull(action);
});

test(`#adapter.clickDefaultButton invokes click() on button matching ${cssClasses.DEFAULT_BUTTON}`, () => {
  const wrapper = mount(
    <Dialog>
      <DialogContent><p>meowkay</p></DialogContent>
      <DialogFooter>
       <DialogButton action="dismiss">Dismiss</DialogButton>
       <DialogButton action="accept" isDefault>Accept</DialogButton>
      </DialogFooter>
    </Dialog>
  );
  const defaultButton = wrapper.instance().defaultButton_;
  defaultButton.click = td.func('click');
  wrapper.instance().adapter.clickDefaultButton();
  td.verify(defaultButton.click(), {times: 1});
});


test(`#adapter.clickDefaultButton does nothing if no button matches ${cssClasses.DEFAULT_BUTTON}`, () => {
  const wrapper = mount(
    <Dialog>
      <DialogContent><p>meowkay</p></DialogContent>
      <DialogFooter>
       <DialogButton action="dismiss">Dismiss</DialogButton>
       <DialogButton action="accept">Accept</DialogButton>
      </DialogFooter>
    </Dialog>
  );
  const buttons = wrapper.instance().buttons_;
  buttons.map((button) => button.click = td.func('click'));
  wrapper.instance().adapter.clickDefaultButton();
  buttons.map((button) => td.verify(button.click(), {times: 0}));
});

test('#adapter.reverseButtons reverses the order of children under the actions element', 
  () => {
  const acceptButton = (<DialogButton action="accept">Accept</DialogButton>);
  const dismissButton = (<DialogButton action="dismiss">Dismiss</DialogButton>);
  const wrapper = mount(
    <Dialog>
      <DialogContent><p>meowkay</p></DialogContent>
      <DialogFooter>
        {acceptButton}
        {dismissButton}
      </DialogFooter>
    </Dialog>
  );

  const buttons = wrapper.instance().buttons_;
  wrapper.instance().adapter.reverseButtons()
  assert.sameOrderedMembers(buttons.reverse(), wrapper.instance().buttons_);
});

test('#adapter.notifyOpening calls props.onOpening', () => {
  const onOpening = td.func();
  const wrapper = shallow(<Dialog onOpening={onOpening} />);
  wrapper.instance().adapter.notifyOpening();
  td.verify(onOpening(), {times: 1});
});

test('#adapter.notifyOpened calls props.onOpened', () => {
  const onOpen = td.func();
  const wrapper = shallow(<Dialog onOpen={onOpen} />);
  wrapper.instance().adapter.notifyOpened();
  td.verify(onOpen(), {times: 1});
});

test('#adapter.notifyClosing calls props.onClosing', () => {
  const onClosing = td.func();
  const wrapper = shallow(<Dialog onClosing={onClosing} />);
  wrapper.instance().adapter.notifyClosing();
  td.verify(onClosing(), {times: 1});
});

test('#adapter.notifyClosed calls props.onClose', () => {
  const onClose = td.func();
  const wrapper = shallow(<Dialog onClose={onClose} />);
  wrapper.instance().adapter.notifyClosed('close');
  td.verify(onClose('close'), {times: 1});
});


test('#handleOpening adds handler for LAYOUT_EVENTS to window', () => {
  const wrapper = shallow(<Dialog open={false}/>);
  wrapper.instance().handleLayout = td.func();
  wrapper.instance().handleOpening();

  LAYOUT_EVENTS.forEach((eventType) => {
    let evt = new Event(eventType);
    window.dispatchEvent(evt);
    td.verify(wrapper.instance().handleLayout(evt), {times: 1});
  });
});

test('#handleClosing removes handler for LAYOUT_EVENTS to window', () => {
  const wrapper = shallow(<Dialog open={false}/>);
  wrapper.instance().handleLayout = td.func();
  wrapper.instance().handleOpening();

  LAYOUT_EVENTS.forEach((eventType) => {
    let evt = new Event(eventType);
    window.dispatchEvent(evt);
    td.verify(wrapper.instance().handleLayout(evt), {times: 1});
  });

  wrapper.instance().handleClosing();

  LAYOUT_EVENTS.forEach((eventType) => {
    let evt = new Event(eventType);
    window.dispatchEvent(evt);
    td.verify(wrapper.instance().handleLayout(evt), {times: 0});
  });
});


test('#renderContainer returns undefined if no children', () => {
  const wrapper = shallow(<Dialog/>)
  const children = wrapper.instance().props.children
  const container = wrapper.instance().renderContainer(children)
  
  assert.isUndefined(container)
});

test('#renderContainer renders container if children present', () => {
  const wrapper = shallow(
    <Dialog>
      <DialogTitle>Test</DialogTitle>
      <DialogContent><p>Meowkay</p></DialogContent>
    </Dialog>
  );
  wrapper.instance().renderChild = td.func();
  const children = wrapper.instance().props.children
  const container = wrapper.instance().renderContainer(children)
 
  assert.isDefined(container)
  assert.equal(container.props.className,cssClasses.CONTAINER);
  children.forEach( (child,i) =>
    td.verify(wrapper.instance().renderChild(child,i),{times: 1})
  );

});

test('#renderChild will call setId if DialogTitle', () => {
  const title = (<DialogTitle>Test</DialogTitle>);
  const wrapper = shallow(<Dialog>{title}</Dialog>);

  wrapper.instance().setId = td.func();
  wrapper.instance().renderChild(title)
  td.verify(wrapper.instance().setId(title.type.name,undefined),{times: 1});
});

test('#renderChild will call setId if DialogContent', () => {
  const content = (<DialogContent id="your-pet-cat"><p>Meow</p></DialogContent>);
  const wrapper = shallow(<Dialog>{content}</Dialog>);

  wrapper.instance().setId = td.func();
  wrapper.instance().renderChild(content)
  td.verify(wrapper.instance().setId(content.type.name,"your-pet-cat"),{times: 1});
});

test('#renderChild will not call setId if !DialogTitle || !DialogContent', () => {
  const footer = (<DialogFooter>Test</DialogFooter>);
  const wrapper = shallow(<Dialog>{footer}</Dialog>);

  wrapper.instance().setId = td.func();
  wrapper.instance().renderChild(footer)
  td.verify(wrapper.instance().setId(footer.type.name,undefined),{times: 0});
});

test('#setId will set labelledby and a id on DialogTitle if not present', () => {
  const wrapper = mount(<Dialog><DialogTitle>Test</DialogTitle></Dialog>);
  const dialog = wrapper.instance().dialogElement_.current
  
  const labelledby = dialog.getAttribute('aria-labelledby')
  const title = dialog.getElementsByClassName(cssClasses.TITLE)[0]

  assert.equal(labelledby,title.id)
});

test('#setId will set labelledby and from a custom DialogTitle', () => {
  const customId = 'custom-id'
  const wrapper = mount(
    <Dialog>
      <DialogTitle id={customId}>Test</DialogTitle>
    </Dialog>
  );
  const dialog = wrapper.instance().dialogElement_.current
  const labelledby = dialog.getAttribute('aria-labelledby')
  const title = dialog.getElementsByClassName(cssClasses.TITLE)[0]

  assert.equal(labelledby, customId)
  assert.equal(labelledby,title.id)
});

test('#events.onKeyDown triggers #foundaiton.handleInteraction', () => {
  const wrapper = shallow(<Dialog><DialogContent><p>meow</p></DialogContent></Dialog>);

  wrapper.instance().foundation_.handleInteraction = td.func();
  const e = {};
  wrapper.simulate('keydown', e)
  td.verify(wrapper.instance().foundation_.handleInteraction(e), {times: 1});

});

test('#events.onClick triggers #foundaiton.handleInteraction', () => {
  const wrapper = shallow(<Dialog><DialogContent><p>meow</p></DialogContent></Dialog>);

  wrapper.instance().foundation_.handleInteraction = td.func();
  const e = {};
  wrapper.simulate('click', e)
  td.verify(wrapper.instance().foundation_.handleInteraction(e), {times: 1});
});


