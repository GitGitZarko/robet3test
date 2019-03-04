import React from 'react';
//import '../public/css/Sports.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './Header';
import ChampsList from './ChampsList';
import ChampMainContentContainer from './ChampMainContentContainer';

const App = () => {
    return (
        <Router>
        <div className="ui fluid container">
        <Header/>           

        <div className="ui three grid">
                <div className="three column row">
                    <div className="column">
                        <ChampsList/>
                    </div>  
                    <div className="column">  
                    <ChampMainContentContainer />
                    </div>                  
                    <div className="column">Live ticket</div>
                    </div>
                </div>       
        </div>
        </Router>
    )
}

export default App;