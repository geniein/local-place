import React, { useCallback, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { SidebarData } from './sidedata';
import './styles.css';
import { IconContext } from 'react-icons';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const history = useHistory();
  const showSidebar = () => setSidebar(!sidebar);
  const onClickLogout = () => {
    localStorage.setItem("token",'');
    onClickLogOut();
    history.push(
        {
          pathname:'/login',          
        });        
  };
  const onClickLogOut = useCallback(() => {    
    window.Kakao.Auth.logout(function() {
        console.log(window.Kakao.Auth.getAccessToken())
    });
    /* Kakao Unlink
    window.Kakao.API.request({
      url: '/v1/user/unlink',
      success: function(res:any) {
        console.log(res);
      },
      fail: function(err:any) {
        console.log(err);
      }
    })
    */
  }, []);
  return (
    <>      
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars-lf">
            <FaIcons.FaBars onClick={showSidebar} />            
          </Link>
          <Link to="#" className="menu-bars-rg">
            <AiIcons.AiOutlineLogout onClick={onClickLogout}/>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>            
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;