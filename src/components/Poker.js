import React from 'react';
//import '../public/css/Sports.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Header from './Header';


const Poker = () => {
    return (
        <div className="ui three grid">        
        <div className="three column row">
        
            <div className="three wide column">
            Left Sidebar
            </div>  
            <div className="ten wide column">  
            POKER PAGE
            Middle Part
            </div>                  
            <div className="three wide column" >
                    Right part
            </div>
            </div>
        </div>       

      
        
    )
}

export default Poker;