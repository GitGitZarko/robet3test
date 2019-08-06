import React from 'react';
//import '../public/css/Sports.css';
import ChampsList from './ChampsList';
import ChampMainContentContainer from './ChampMainContentContainer';
import TicketGenerator from './TicketGenerator';

const Sport = () => {
    return (
        <div className="ui fluid container">     
            <div className="ui stackable three grid sport-component" >              
                <div className="three column row">                
                    <div className="three wide column">                        
                            <ChampsList />                        
                    </div>
               
                    <div className="ui stackable ten wide column">
                        <ChampMainContentContainer />
                    </div>
                    <div className="ui stackable three wide column sport-component" >
                        <TicketGenerator />
                    </div>
                </div>                
            </div>
        </div>


    )
}

export default Sport;