import React from 'react';
//import '../public/css/Sports.css';
import Header from './Header';
import ChampsList from './ChampsList';
import ChampMainContentContainer from './ChampMainContentContainer';

const App = () => {
    return (
        
        <div className="ui fluid container">
        <Header/>         

        <div className="ui three grid">
                <div className="three column row">
                    <div className="column">
                    <ul>
                        <ChampsList/>
                        </ul>
                    </div>  
                    <div className="column">  
                    <ChampMainContentContainer />
                    </div>                  
                    <div className="column">Live ticket</div>
                    </div>
                </div>       
        </div>
        
    )
}

export default App;