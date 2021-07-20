import React, { forwardRef, createContext, useEffect, useState } from 'react';
import {Sidebar, SidebarInner} from './styles';
import classNames from 'classnames';
import { SidebarLayout } from './styles';
import SidebarHeader from './Layout/SidebarHeader';
import MenuItem from './Menu/MenuItem';
import Menu from './Menu/Menu';
import * as FaIcons from 'react-icons/fa';

export type Props = React.HTMLAttributes<HTMLElement> & {
  collapsed?: boolean;  
  toggled?: boolean;
  width?: string | number;
  collapsedWidth?: string | number;
  image?: string;
  className?: string;
  children?: React.ReactNode;
  breakPoint?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  onToggle?: (value: boolean) => void;
  style?: React.CSSProperties;
};

export interface SidebarContextProps {
  collapsed: boolean;  
  toggled: boolean;
}

export const SidebarContext = createContext<SidebarContextProps>({
  collapsed: false,  
  toggled: false,
});

const ProSidebar: React.ForwardRefRenderFunction<unknown, Props> = (
  {
    children,
    className,
    width,
    collapsedWidth,
    collapsed,    
    toggled,
    image,
    breakPoint,
    onToggle,
    style = {},
    ...rest
  },
  ref,
) => {
  const [sidebarState, setSidebarState] = useState({
    collapsed: typeof collapsed === 'undefined' ? false : collapsed,    
    toggled: typeof toggled === 'undefined' ? false : toggled,
  });

  const sidebarRef: React.RefObject<HTMLDivElement> =
    (ref as any) || React.createRef<HTMLDivElement>();

  const handleToggleSidebar = () => {
    const toggleValue = sidebarState.toggled;
    setSidebarState({ ...sidebarState, toggled: !toggleValue });
    if (onToggle) {
      onToggle(!toggleValue);
    }
  };

  const widthStyle = width ? { width, minWidth: width } : {};
  const collapsedWidthStyle = collapsedWidth
    ? { width: collapsedWidth, minWidth: collapsedWidth }
    : {};
  const finalWidth = collapsed ? collapsedWidthStyle : widthStyle;

  useEffect(() => {
    if(collapsed && toggled) setSidebarState({ ...sidebarState, collapsed, toggled});
  }, [collapsed, toggled]);

  return (
    <SidebarContext.Provider value={sidebarState}>
        {/* <Sidebar
            ref={sidebarRef}
            className={classNames(className, breakPoint, { collapsed, toggled })}
            style={{ width:200,...finalWidth, ...style }}
            {...rest}
        >            
            <SidebarInner>
                <SidebarLayout>
                    <SidebarHeader>
                        Hello                        
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem icon={<FaIcons.FaGem/>}>Dashboard</MenuItem>
                            <MenuItem icon={<FaIcons.FaHeart />}>World</MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        World
                    </SidebarFooter>
                </SidebarLayout>
            </SidebarInner>                   
        </Sidebar> */}
      {/* <div
        ref={sidebarRef}
        className={classNames('pro-sidebar', className, breakPoint, { collapsed, toggled })}
        style={{ ...finalWidth, ...style }}
        {...rest}
      > */}
        <Sidebar ref={sidebarRef}
        //className={classNames('pro-sidebar', className, breakPoint, { collapsed, toggled })}
        style={{width:200, ...finalWidth, ...style }}
        {...rest}
        >
        {/* <div className="pro-sidebar-inner">
          {image ? <img src={image} alt="sidebar background" className="sidebar-bg" /> : null}
          <div className="pro-sidebar-layout">{children}</div>
        </div> */}
        <SidebarInner>
          <SidebarLayout>
            {children}
          </SidebarLayout>
        </SidebarInner>
        {/* <div
          className="overlay"
          onClick={handleToggleSidebar}
          onKeyPress={handleToggleSidebar}
          role="button"
          tabIndex={0}
          aria-label="overlay"
        /> */}
      </Sidebar>
    </SidebarContext.Provider>
  );
};

export default forwardRef<unknown, Props>(ProSidebar);