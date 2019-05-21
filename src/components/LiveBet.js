import React from 'react';
//import '../public/css/Sports.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Header from './Header';
import TicketGenerator from './TicketGenerator';


const LiveBet = () => {
    return (
        <div className="ui three grid">        
        <div className="three column row" style={{marginRight: '20px'}}>
        
            <div className="three wide column">
            Left Sidebar
            </div>  
            <div className="ten wide column">  
            LIVE PAGE
            Middle Part
            </div>                  
            <div className="three wide column" style={{ background: 'aliceblue', textAlign: 'center', border: '1px solid blue' }}>
                    <TicketGenerator />     
            </div>
            </div>
        </div>       

      
        
    )
}

export default LiveBet;