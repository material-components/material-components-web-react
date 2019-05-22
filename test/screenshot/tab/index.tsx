import React from 'react';
import Tab, {TabProps} from '../../../packages/tab';
import MaterialIcon from '../../../packages/material-icon/index';
import '../../../packages/tab-indicator/index.scss';
import '../../../packages/tab/index.scss';
import './index.scss';

interface TabContentType {
  num: number;
}

function TabContent({num}: TabContentType) {
  return (
    <React.Fragment>
      <MaterialIcon className='mdc-tab__icon' icon='favorite' />
      <span className='mdc-tab__text-label'>Tab {num}</span>
    </React.Fragment>
  );
}

interface TabsProps {
  children: React.ReactNode;
}

function isElementTab(element: any): element is Tab {
  return element && typeof element.computeIndicatorClientRect === 'function';
}

function Tabs({children}: TabsProps) {
  return <div className='tabs'>{children}</div>;
}

interface TabsControllerProps extends TabProps {
  tabContent: (num: number) => React.ReactElement<any>;
}

interface TabsControllerState {
  activeIndex: number;
  previousActiveIndex: number;
}

class TabsController extends React.Component<
  TabsControllerProps,
  TabsControllerState
> {
  tabBoundingRects: {[n: number]: ClientRect | undefined} = {};

  state = {activeIndex: 0, previousActiveIndex: 0};

  tabInit = (tabEl: Tab | null, index: number) => {
    if (isElementTab(tabEl)) {
      this.tabBoundingRects[index] = tabEl.computeIndicatorClientRect();
    }
  };

  render() {
    const {tabContent, ...otherProps} = this.props;

    const {activeIndex, previousActiveIndex} = this.state;

    return (
      <Tabs>
        {[1, 2, 3].map((num, index) => (
          <Tab
            active={index === activeIndex}
            key={index}
            previousIndicatorClientRect={
              this.tabBoundingRects[previousActiveIndex]
            }
            // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
            // @ts-ignore
            ref={(el: Tab) => this.tabInit(el, index)}
            onClick={() =>
              this.setState({
                previousActiveIndex: activeIndex,
                activeIndex: index,
              })
            }
            {...otherProps}
          >
            {tabContent(num)}
          </Tab>
        ))}
      </Tabs>
    );
  }
}

function TabScreenshotTest() {
  return (
    <div>
      <h3>Basic Tabs</h3>
      <TabsController tabContent={(num) => <TabContent num={num} />} />

      <h3>Tabs w/ Custom Element Icon</h3>
      <TabsController
        tabContent={() => <span>Tab</span>}
        indicatorContent={
          <MaterialIcon className='light-border' icon='star_border' />
        }
      />

      <h3>Tabs w/ Icon Tag</h3>
      <TabsController
        tabContent={() => <span>Tab</span>}
        indicatorContent={
          <i className='material-icons light-border'>3d_rotation</i>
        }
      />

      <h3>Tabs Min Width</h3>
      <TabsController minWidth tabContent={(num) => <TabContent num={num} />} />

      <h3>Tabs Stacked</h3>
      <TabsController stacked tabContent={(num) => <TabContent num={num} />} />

      <h3>Tabs w/ Fading Tab Indicator</h3>
      <TabsController
        isFadingIndicator
        tabContent={(num) => <TabContent num={num} />}
      />

      <h3>Tabs w/ Min Width Tab Indicator</h3>
      <TabsController
        isMinWidthIndicator
        stacked
        tabContent={(num) => <TabContent num={num} />}
      />
    </div>
  );
}

export default TabScreenshotTest;
