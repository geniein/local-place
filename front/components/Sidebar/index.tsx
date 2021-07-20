

import React, { FC, useState } from 'react';
// import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from './ProSidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import InitSidebar from './ProSidebar/InitSidebar';
import { useHistory } from 'react-router';

interface Props {
    collapsed? : boolean
    toggled? : any
    handleToggleSidebar? : ()=>void
}

const Sidebar = () =>{

    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    
    const history = useHistory();
    
    const handleToggleSidebar = () => {
        setToggled(!toggled);
    };

    const handleCollapsedChange = () => {
        console.log(collapsed);
        setCollapsed(!collapsed);
    };

    const onClickBlock = () => {
        history.push(
            {
              pathname:'/workspace/genieblock',          
            });  
    }

    return(
        <InitSidebar                
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
            collapsedWidth='80px'
        >
            <SidebarHeader onClick={handleCollapsedChange}>
                <div
                style={{
                    padding: '24px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 14,
                    letterSpacing: '1px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
                >
                    Workspace          
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaTachometerAlt />}
                        suffix={<span style={{
                            padding: '3px 6px',
                            fontSize: '9px',
                            letterSpacing: '1px',
                            borderRadius: '15px',
                            color: '#ffffff',
                            background: '#d63030'
                        }}>New</span>}
                    onClick={onClickBlock}>
                        Block
                    </MenuItem>
                    <MenuItem icon={<FaGem />}> Component</MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter style={{ textAlign: 'center' }}>
                <div                
                style={{
                    display: 'flex',                    
                    padding: '20px 24px',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                <a
                    href="/"
                    target="_blank"                                        
                    style={{
                        color: '#adadad',
                        background: '#353535',
                        display: 'flex',
                        borderRadius: '40px',                        
                        height: '35px',
                        lineHeight: '40px',
                        padding: 0,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <FaGithub />
                    <span style={{marginLeft: '5px', fontSize: '13px'}}> viewSource</span>
                </a>
                </div>
            </SidebarFooter>
        </InitSidebar>
    )
}

export default Sidebar;