import React from 'react';
//import '../public/css/Sports.css';
import Header from './Header';
import ChampsList from './ChampsList';
import ChampMainContentContainer from './ChampMainContentContainer';
import TicketGenerator from './TicketGenerator';

const App = () => {
    return (
        
        <div className="ui fluid container">
        <Header/>         

        <div className="ui three grid">
                <div className="three column row">
                    <div className="three wide column">
                    <ul>
                        <ChampsList/>
                        </ul>
                    </div>  
                    <div className="ten wide column">  
                    <ChampMainContentContainer />
                    </div>                  
                    <div className="three wide column" style={{ background: 'aliceblue', textAlign: 'center', border: '1px solid blue' }}>
                    <TicketGenerator />
             
                    </div>
                    </div>
                </div>       
        </div>
        
    )
}

export default App;