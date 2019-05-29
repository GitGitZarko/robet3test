import React, { Component } from 'react';
import { connect } from 'react-redux';
//import '../public/css/Sports.css';
import { fetchLiveBetGames, fetchLiveCalendar } from '../../actions';
import LiveMatchOverview from './LiveMatchOverview';
import TicketGenerator from '../TicketGenerator';
import SingleMatchLive from './SingleMatchLive';
import Calendar from './Calendar';

class LiveBet extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            sportId: 1,
            componentView: 0
        }
        
    }

    componentDidMount(){        
        this.props.fetchLiveBetGames(Math.random(), this.state.sportId)
        this.interval = setInterval(() => this.props.fetchLiveBetGames(Math.random(), this.state.sportId), 2000); 
    }

    componentWillUnmount() { 
        clearInterval(this.interval);
      }

      klik(e, sport){
        e.preventDefault();
        this.props.fetchLiveBetGames(Math.random(), sport)
        this.setState({
            sportId: sport
        })
      }

    renderSports() {

        if(!this.props.liveBetGames) return null;
        const { SportItems } = this.props.liveBetGames
        const rezultat = SportItems.map(data => <div 
                                                        onClick={(e) => this.klik(e, data.SportId) } 
                                                        style={{display: 'inline-block', textAlign: 'center'}}>
                                                <div    style={{margin: '10px'}}>{data.SportName}
                                                </div>
                                                <span className="ui red circular label">
                                                        {data.MatchNumber}
                                                </span>
                                                </div> )        
        return rezultat
    }
    renderSportsCalendar() {

        if(!this.props.calendar) return null;
        const { SportItems } = this.props.calendar
        const rezultat = SportItems.map(data => <div 
                                                        onClick={(e) => this.klik(e, data.SportId) } 
                                                        style={{display: 'inline-block', textAlign: 'center'}}>
                                                <div    style={{margin: '10px'}}>{data.SportName}
                                                </div>
                                                <span className="ui red circular label">
                                                        {data.MatchNumber}
                                                </span>
                                                </div> )        
        return rezultat
    }

    calendarRender(e){
        e.preventDefault()        
        this.setState({componentView: 3 })
        this.props.fetchLiveCalendar(Math.random(), this.state.sportId);
    }
    render(){    

        return (
            <div className="ui three grid">        
            <div className="two column row" style={{marginRight: '20px'}}>                    
                <div className="thirteen wide column">  
                <div>{this.state.componentView === 3 ? this.renderSportsCalendar() : this.renderSports()}</div>
                <div style={{textAlign: "right"}}>
                <button className="ui purple button" onClick={() => this.setState({componentView: 1 })}>Overview</button>
                <button className="ui purple button" onClick={() => this.setState({componentView: 2 })}>Match</button>
                <button className="ui purple button" onClick={(e) => this.calendarRender(e) }>Calendar</button>
                </div>
                {this.state.componentView === 0 || this.state.componentView === 1 ? <LiveMatchOverview sportOverview={this.props.liveBetGames}/> : null}
                {this.state.componentView === 2 ? <SingleMatchLive /> : null}
                {this.state.componentView === 3 ? <Calendar /> : null}
                </div>                  
                <div className="three wide column" style={{ background: 'aliceblue', textAlign: 'center', border: '1px solid blue' }}>
                    <TicketGenerator />     
                </div>
                </div>
            </div>       
    
          
            
        )
    }
    
}

const mapStateToProps = ({ liveBetGames, calendar }) => ({ liveBetGames, calendar })
export default connect(mapStateToProps,{ fetchLiveBetGames, fetchLiveCalendar })(LiveBet);