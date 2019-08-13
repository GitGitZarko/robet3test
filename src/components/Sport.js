import React from 'react';
//import '../public/css/Sports.css';
import MediaQuery from 'react-responsive';
import ChampsList from './ChampsList';
import ChampMainContentContainer from './ChampMainContentContainer';
import TicketGenerator from './TicketGenerator';
import TicketGeneratorMobile from './Mobile/TIcketGeneratorMobile';

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
                    <MediaQuery maxWidth={414}>                     
                        <TicketGeneratorMobile />                                            
                    </MediaQuery>       
                    <MediaQuery minDeviceWidth={1224}>
                    <div className="ui stackable three wide column sport-component" >
                        <TicketGenerator />
                    </div>
                    </MediaQuery>             
                </div>                
            </div>
        </div>


    )
}

export default Sport;