import React, { forwardRef, LegacyRef } from 'react';
import classNames from 'classnames';
import { Content } from '../styles';

export type Props = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

const SidebarContent: React.ForwardRefRenderFunction<unknown, Props> = (
  { children, className, ...rest },
  ref,
) => {
  const sidebarContentRef: LegacyRef<HTMLDivElement> =
    (ref as any) || React.createRef<HTMLDivElement>();
  return (
      <Content ref={sidebarContentRef} {...rest}>
          {children}
      </Content>    
  );
};

export default forwardRef<unknown, Props>(SidebarContent);