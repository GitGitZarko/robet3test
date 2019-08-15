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
            <MediaQuery minDeviceWidth={1224}>
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
                </MediaQuery>   

                <MediaQuery maxWidth={1024}>                     
                <div className="sixteen column row">                
                    <div className="sixteen wide column">                        
                            <ChampsList />                        
                    </div>
               
                    <div className="ui stackable sixteen wide column">
                        <ChampMainContentContainer />
                    </div>
                    
                        <TicketGeneratorMobile />                                                                                    
                </div> 
                </MediaQuery>             




            </div>
        </div>


    )
}

export default Sport;