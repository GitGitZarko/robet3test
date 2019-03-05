import React, { Component } from 'react';
import logo from '../public/images/logo_new.png';
import { Menu, Search, Icon, Button } from 'semantic-ui-react'


class Header extends Component {

   render() {   
    return (
      <div>
      <Menu stackable size="massive" >
        <Menu.Item name="logo">
          <img src={logo} />
        </Menu.Item>
      <Menu.Item name="HOME">        
      </Menu.Item>
      <Menu.Menu >    
      <Menu.Item name="SPORT">        
      </Menu.Item>
      <Menu.Item name="SPORTLIVE">        
      </Menu.Item>
      <Menu.Item name="CASINO">        
      </Menu.Item>
      <Menu.Item name="VIRTUAL SPORT">        
      </Menu.Item>
      <Menu.Item name="POKER">        
      </Menu.Item>
      </Menu.Menu>
    </Menu>
      {/* //   <div>                  
      //      <header>
      //      <div className="ui left aligned container">
      //           <img src={logo} alt="Logo New"/>
      //           <div className="ui center aligned container">
      //                 <a href="">HOME</a>        
      //                 <a className="active" href="#">SPORTS</a>           
      //                 <a  href="#">SPORT LIVE</a>
      //                 <a href="#">CASINO</a>
      //                 <a href="#">VIRTUAL SPORT</a>
      //                 <a href="#">POKER</a>
      //              </div>
      //       </div>       
      //      </header>
      //   </div> */}
      </div>
        )
  }
}

export default Header;
