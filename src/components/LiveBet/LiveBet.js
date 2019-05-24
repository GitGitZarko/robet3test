import React, { Component } from 'react';
import { connect } from 'react-redux';
//import '../public/css/Sports.css';
import { fetchLiveBetGames } from '../../actions';
import LiveMatchOverview from './LiveMatchOverview';
import TicketGenerator from '../TicketGenerator';

class LiveBet extends Component {
    constructor(props) {
        super(props)
        
    }

    componentDidMount(){
        this.props.fetchLiveBetGames();
    }

    renderSports() {

        if(!this.props.liveBetGames) return null;
        const { SportItems } = this.props.liveBetGames
        const rezultat = SportItems.map(data => <div style={{display: 'inline-block', textAlign: 'center'}}><div style={{margin: '10px'}}>{data.SportName}</div><span className="ui red circular label">{data.MatchNumber}</span></div> )
        return rezultat
    }

    render(){      

        return (
            <div className="ui three grid">        
            <div className="two column row" style={{marginRight: '20px'}}>                    
                <div className="thirteen wide column">  
                { this.renderSports() }
                    <LiveMatchOverview sportOverview={this.props.liveBetGames}/>
                </div>                  
                <div className="three wide column" style={{ background: 'aliceblue', textAlign: 'center', border: '1px solid blue' }}>
                    <TicketGenerator />     
                </div>
                </div>
            </div>       
    
          
            
        )
    }
    
}

const mapStateToProps = ({ liveBetGames }) => ({ liveBetGames })
export default connect(mapStateToProps,{ fetchLiveBetGames })(LiveBet);