import React, { forwardRef, LegacyRef } from 'react';
import {IconWrapper, Icon, StyledMenuItem, InnerItem, ItemContent, SuffixWrapper,PrefixWrapper} from './styles';

export type Props = React.LiHTMLAttributes<HTMLLIElement> & {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  active?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  firstchild?: boolean;
  popperarrow?: boolean;
};

const MenuItem: React.ForwardRefRenderFunction<unknown, Props> = (
  { children, className, icon, active, prefix, suffix, firstchild, popperarrow, ...rest },
  ref,
) => {
  const menuItemRef: LegacyRef<HTMLLIElement> = (ref as any) || React.createRef<HTMLLIElement>();

  return (
    // <li ref={menuItemRef} className={classNames('pro-menu-item', className, { active })} {...rest}></li>
    <StyledMenuItem ref={menuItemRef} {...rest}>
        <InnerItem tabIndex={0} role="button">
        {icon ? (          
            <IconWrapper>
                <Icon>{icon}</Icon>
            </IconWrapper>
        ) : null}
        {prefix ? <PrefixWrapper>{prefix}</PrefixWrapper> :null}
        <ItemContent>{children}</ItemContent>
        {suffix ? <SuffixWrapper>{suffix}</SuffixWrapper> :null}           
      </InnerItem>
    </StyledMenuItem>
  );
};

export default forwardRef<unknown, Props>(MenuItem);