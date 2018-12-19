import * as React from 'react';
import Tab, {TabProps} from '../../../packages/tab';
// https://github.com/material-components/material-components-web-react/issues/513
// @ts-ignore
import MaterialIcon from '../../../packages/material-icon/index';
import '../../../packages/tab-indicator/index.scss';
import '../../../packages/tab/index.scss';
import './index.scss';

interface TabContentType {
  num: number;
}

const TabContent: (args: TabContentType) => React.ReactElement<any> = ({
  num, // eslint-disable-line react/prop-types
}) => (
  <React.Fragment>
    <MaterialIcon className='mdc-tab__icon' icon='favorite' />
    <span className='mdc-tab__text-label'>Tab {num}</span>
  </React.Fragment>
);

interface TabsProps {
  children: React.ReactNode;
}

function isElementTab(element: any): element is Tab {
  return element !== null;
}

const Tabs: (args: TabsProps) => JSX.Element = ({
  children, // eslint-disable-line react/prop-types
}) => {
  return <div className='tabs'>{children}</div>;
};

interface TabsControllerProps extends TabProps {
  tabContent: (num: number) => React.ReactElement<any>
}

interface TabsControllerState {
  activeIndex: number;
  previousActiveIndex: number;
}

class TabsController extends React.Component<TabsControllerProps, TabsControllerState> {
  tabBoundingRects: {[n: number]: ClientRect} = {};

  state = {activeIndex: 0, previousActiveIndex: 0};

  tabInit = (tabEl: React.Ref<Tab>, index: number) => {
    if (isElementTab(tabEl)) {
      this.tabBoundingRects[index] = tabEl.computeIndicatorClientRect();
    }
  }

  render() {
    const {
      tabContent, // eslint-disable-line
      ...otherProps
    } = this.props;

    const {activeIndex, previousActiveIndex} = this.state;

    return (
      <Tabs>
        {[1, 2, 3].map((num, index) => (
          <Tab
            active={index === activeIndex}
            key={index}
            previousIndicatorClientRect={this.tabBoundingRects[previousActiveIndex]}
            // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
            // @ts-ignore
            ref={(el: React.Ref<Tab>) => this.tabInit(el, index)}
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

const TabScreenshotTest = () => {
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
        indicatorContent={<i className='material-icons light-border'>
          3d_rotation
        </i>}
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
};
export default TabScreenshotTest;
