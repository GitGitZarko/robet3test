import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table, Button} from 'semantic-ui-react';
//import '../public/css/Sports.css';
import { fetchLiveBetGames, fetchSingleMatchLive } from '../../actions';

class SingleMatchLive extends Component {
    constructor(props) {
        super(props)            
    }
    componentDidMount(){        
        this.props.fetchSingleMatchLive(Math.random(), this.getFirstMatchOfSport())
        this.interval = setInterval(() => this.props.fetchSingleMatchLive(Math.random(), this.getFirstMatchOfSport()), 2000); 
    }

    componentWillUnmount() { 
        clearInterval(this.interval);
      }       

    getFirstMatchOfSport(){
        const singleMatchId = this.props.sportOverview.Sports[0].Tournaments[0].Matchies[0].MatchId        
        return singleMatchId
    }

    render(){    
        if(!this.props.singleMatchLive) return null;
        const { Bets } = this.props.singleMatchLive
        const single = this.props.singleMatchLive
        
        return (
            <div >        
            <Table fixed>
                <Table.Row >  
                <Table.HeaderCell singleLine>{single.Team1}</Table.HeaderCell>
                <Table.HeaderCell>{single.Team2}</Table.HeaderCell>
                <Table.HeaderCell>{single.MatchDate}</Table.HeaderCell>
                <Table.HeaderCell>{single.SportName}</Table.HeaderCell>
                <Table.HeaderCell>{single.Score1}</Table.HeaderCell>                                      
               </Table.Row>             
            </Table>           
            </div>       
    
            
        )
    }
    
}

const mapStateToProps = ({ liveBetGames, singleMatchLive }) => ({ liveBetGames, singleMatchLive })
export default connect(mapStateToProps,{ fetchLiveBetGames, fetchSingleMatchLive })(SingleMatchLive);