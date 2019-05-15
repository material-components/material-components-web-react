import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {Snackbar} from '../../../packages/snackbar/index';
import {MDCSnackbarAdapter} from '@material/snackbar/adapter';

function getAdapter(instance: Snackbar): MDCSnackbarAdapter {
  // @ts-ignore adapter_ is a protected property, we need to override it
  return instance.foundation.adapter_;
}

suite('Snackbar');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Snackbar className='test-class-name' message='example' />
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-snackbar'));
  wrapper.unmount();
});

test('does not render actions block if no actions sent', () => {
  const wrapper = shallow(<Snackbar message='example' />);
  assert.equal(wrapper.find('.mdc-snackbar__actions').length, 0);
  wrapper.unmount();
});

test('sets timeoutMs', () => {
  const wrapper = shallow<Snackbar>(
    <Snackbar timeoutMs={5000} message='example' />
  );
  assert.equal(wrapper.instance().getTimeoutMs(), 5000);
  wrapper.unmount();
});

test('sets timeoutMs', () => {
  const wrapper = shallow<Snackbar>(
    <Snackbar closeOnEscape={true} message='example' />
  );
  assert.equal(wrapper.instance().getCloseOnEscape(), true);
  wrapper.unmount();
});

test('renders actions', () => {
  const wrapper = shallow(<Snackbar message='example' actionText='action' />);
  assert.equal(wrapper.find('.mdc-snackbar__actions').length, 1);
  assert.equal(wrapper.find('.mdc-snackbar__action').length, 1);
  wrapper.unmount();
});

test('renders leading actions', () => {
  const wrapper = shallow(
    <Snackbar leading={true} message='example' actionText='action' />
  );
  assert.isTrue(wrapper.hasClass('mdc-snackbar'));
  assert.isTrue(wrapper.hasClass('mdc-snackbar--leading'));
  wrapper.unmount();
});

test('renders stacked actions', () => {
  const wrapper = shallow(
    <Snackbar stacked={true} message='example' actionText='action' />
  );
  assert.isTrue(wrapper.hasClass('mdc-snackbar'));
  assert.isTrue(wrapper.hasClass('mdc-snackbar--stacked'));
  wrapper.unmount();
});

test('#componentDidUpdate calls foundation.open if props.open is true', () => {
  const wrapper = shallow<Snackbar>(
    <Snackbar open={false} message='example' actionText='action' />
  );
  wrapper.instance().foundation.open = td.func<() => void>();
  wrapper.setProps({open: true});
  td.verify(wrapper.instance().foundation.open(), {times: 1});
});

test('#componentDidUpdate calls foundation.close if props.open is false', () => {
  const wrapper = shallow<Snackbar>(
    <Snackbar open={true} message='example' actionText='action' />
  );
  const reason = 'forced';
  wrapper.instance().foundation.close = td.func<(reason: string) => void>();
  wrapper.setProps({open: false, reason});
  td.verify(wrapper.instance().foundation.close(reason), {times: 1});
});

test('opening notification works', () => {
  const openingHandler = td.func<() => void>();
  const wrapper = shallow<Snackbar>(
    <Snackbar
      open={false}
      onOpening={openingHandler}
      message='example'
      actionText='action'
    />
  );
  getAdapter(wrapper.instance()).notifyOpening();
  td.verify(openingHandler(), {times: 1});
  wrapper.unmount();
});

test('open notification works', () => {
  const openHandler = td.func<() => void>();
  const wrapper = shallow<Snackbar>(
    <Snackbar
      open={false}
      onOpen={openHandler}
      message='example'
      actionText='action'
    />
  );
  getAdapter(wrapper.instance()).notifyOpened();
  td.verify(openHandler(), {times: 1});
  wrapper.unmount();
});

test('closing notification works', () => {
  const closingHandler = td.func<(reason: string) => void>();
  const wrapper = shallow<Snackbar>(
    <Snackbar
      open={false}
      onClosing={closingHandler}
      message='example'
      actionText='action'
    />
  );
  getAdapter(wrapper.instance()).notifyClosing('unit_test');
  td.verify(closingHandler('unit_test'), {times: 1});
  wrapper.unmount();
});

test('close notification works', () => {
  const closeHandler = td.func<(reason: string) => void>();
  const wrapper = shallow<Snackbar>(
    <Snackbar
      open={false}
      onClose={closeHandler}
      message='example'
      actionText='action'
    />
  );
  getAdapter(wrapper.instance()).notifyClosed('unit_test');
  td.verify(closeHandler('unit_test'), {times: 1});
  wrapper.unmount();
});

test('close method works', () => {
  const wrapper = shallow<Snackbar>(
    <Snackbar message='example' actionText='action' />
  );
  wrapper.instance().close('unit_test');
  assert.equal(wrapper.instance().isOpen(), false);
  wrapper.unmount();
});

test('announce works', () => {
  const announceHandler = td.func<() => void>();
  const wrapper = shallow<Snackbar>(
    <Snackbar onAnnounce={announceHandler} message='example' />
  );
  td.verify(announceHandler(), {times: 1});
  wrapper.unmount();
});

test('handleKeyDown method works', () => {
  const wrapper = shallow<Snackbar>(
    <Snackbar open={false} message='example' actionText='action' />
  );
  wrapper.simulate('keydown', {
    nativeEvent: {},
  });
  wrapper.unmount();
});

test('handleActionClick method works', () => {
  const wrapper = shallow<Snackbar>(
    <Snackbar open={false} message='example' actionText='action' />
  );
  wrapper.find('.mdc-snackbar__action').simulate('click', {
    nativeEvent: {},
  });
  wrapper.unmount();
});
