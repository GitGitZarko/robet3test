import React from 'react';
//import '../public/css/Sports.css';
import ChampsList from './ChampsList';
import ChampMainContentContainer from './ChampMainContentContainer';
import TicketGenerator from './TicketGenerator';

const Sport = () => {
    return (
        <div className="ui fluid container">
            <div className="ui three grid sport-component" >
                <div className="three column row">
                    <div className="three wide column">
                        <ul>
                            <ChampsList />
                        </ul>
                    </div>
                    <div className="sixteen wide column">
                        <ChampMainContentContainer />
                    </div>
                    <div className="three wide column sport-component" >
                        <TicketGenerator />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Sport;