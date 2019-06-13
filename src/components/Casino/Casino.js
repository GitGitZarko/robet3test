import React from 'react';
//import '../public/css/Sports.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Header from '../Header';
import Game from './Game';

const Casino = () => {
    return (
        <div className="ui three grid">        
        <div className="three column row">
        
            <div className="three wide column" style={{background: 'lightblue'}}>
            Left Sidebar            
            </div>  
            <div className="thirteen wide column" style={{background: 'lightgreen'}}>  
            <div className="ui grid">
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                </div>
            </div>                  
            
            </div>
        </div>       

      
        
    )
}

export default Casino;