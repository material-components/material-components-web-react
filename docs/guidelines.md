# General Guidelines

## Integrating with Components

Some of our components accept a `React.Component` as a prop. If you decide to build a component, it will more than likely need some additional feature or attributes added to operate correctly.

### Classnames

Pass the prop `className` to the className prop on the parent element. As an example please see the [MaterialIcon Component](../packages/material-icon/index.js) or the example below:


```js
class Dog extends React.Component {
  render() {
    const {className = ''} = this.props;
    const allClasses = `${className} dog-class`;

    return (
      <div className={allClasses}>
        Woof
      </div>
    );
  }
};
```
