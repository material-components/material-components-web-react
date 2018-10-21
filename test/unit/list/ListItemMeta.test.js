

// test('renders meta as span element if meta is a string', () => {
//     const wrapper = shallow(<ListItem meta='info' />);
//     assert.equal(wrapper.find('.mdc-list-item__meta').type(), 'span');
//   });
  
//   test('renders meta element if meta is an anchor element', () => {
//     const wrapper = shallow(<ListItem meta={<a />} />);
//     assert.equal(wrapper.find('.mdc-list-item__meta').type(), 'a');
//   });
  
//   test('renders meta element if meta is a button element', () => {
//     const wrapper = shallow(<ListItem meta={<button />} />);
//     assert.equal(wrapper.find('.mdc-list-item__meta').type(), 'button');
//   });
  
//   test('renders meta with tabIndex of props.childrenTabIndex if tabIndex specified', () => {
//     const wrapper = shallow(<ListItem meta={<button tabIndex={0} />} childrenTabIndex={0}/>);
//     assert.equal(wrapper.find('.mdc-list-item__meta').props().tabIndex, 0);
//   });
  
//   test('renders meta with tabIndex -1 if tabIndex not specified', () => {
//     const wrapper = shallow(<ListItem meta={<button />} childrenTabIndex={0}/>);
//     assert.equal(wrapper.find('.mdc-list-item__meta').props().tabIndex, -1);
//   });
