import React, { Component } from 'react';
import logo from '../public/images/logo_new.png';
import { Menu, Search, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const Header = () => {  
    return (
      <div class="center aligned column">
      <div className="ui secondary  pointing menu" > 
       <Link to="/" className="left item" >
          <div class="ui logo image">
            <img src={logo}/>
          </div>
      </Link>
        <Link to="/" className="item" >
          SPORT
        </Link>
        <Link to="/LiveBet" className="item" >
        SPORT LIVE
        </Link>
        <Link to="/Casino" className="item" >
        CASINO'
        </Link>
        <Link to="/Virtual" className="item" >
        VIRTUAL SPORT
        </Link>
        <Link to="/Poker" className="item" >
        POKER
        </Link>
        <div className="right menu">
        <Link to="/Login" className="item">
          Login
        </Link>
        </div>
      </div>
      </div>
        )
  
}

export default Header;
