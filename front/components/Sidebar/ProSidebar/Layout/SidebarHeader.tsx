import React, { forwardRef, LegacyRef } from 'react';
import { Header } from '../styles';
import classNames from 'classnames';

export type Props = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

const SidebarHeader: React.ForwardRefRenderFunction<unknown, Props> = (
  { children, className, ...rest },
  ref,
) => {
  const sidebarHeaderRef: LegacyRef<HTMLDivElement> =
    (ref as any) || React.createRef<HTMLDivElement>();
  return (
    <Header ref={sidebarHeaderRef} {...rest}>
      {children}
    </Header>  
  );
};

export default forwardRef<unknown, Props>(SidebarHeader);