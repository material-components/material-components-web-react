import * as classnames from 'classnames';
import * as React from 'react';

export interface TypographyProps<T> extends React.HTMLProps<T> {
  children?: React.ReactNode,
  className?: string,
  tag?: string,
}

interface EnhancedProps {
  tag: string,
  classModifier: string,
}

const typographyHOC = <T extends {}>(options: EnhancedProps) => {
  const {tag, classModifier} = options;

  const Typography: React.FunctionComponent<TypographyProps<T>> = ({
    /* eslint-disable */
    children,
    className = '',
    tag: Tag = tag,
    /* eslint-enable */
    ...otherProps
  }) => {
    const classes = classnames(
      'mdc-typography',
      `mdc-typography--${classModifier}`,
      className
    );

    return (
      // https://github.com/Microsoft/TypeScript/issues/28892
      // @ts-ignore
      <Tag className={classes} {...otherProps}>
        {children}
      </Tag>
    );
  };

  return Typography;
};

export default typographyHOC;
