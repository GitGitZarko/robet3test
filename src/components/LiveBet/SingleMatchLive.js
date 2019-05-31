import React, { Component } from 'react';
import { connect } from 'react-redux';
import UniqueSingleMatch from './UniqueSingleMatch';
import { Header, Table, Button, Container, Transition} from 'semantic-ui-react';
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
        const { Sports } = this.props.liveBetGames
        const single = this.props.singleMatchLive
        
        return (
            <div className="ui two grid"> 
            <div className="four wide column">        
             <Table fixed >
                <Table.Row >  
                    {Sports.map((data, i ) => {
                        return <Table.Cell selectable style={{padding: '0px 0px 0px 5px'}}>
                        {data.Tournaments.map((ata, f) => 
                            <div>
                                <Header style={{background: '#424242', color: 'white', fontWeight: '600', padding: '10px', margin: 0, border: '1px dotted white'}}> 
                                    {ata.TournamentName} 
                                </Header>                                 
                                {ata.Matchies.map((gego, b) => {
                                    return <Table.Row verticalAlign='middle' style={{background: 'black', color: 'white'}}>
                                    <Table.Cell colSpan='2' width="four">
                                        <Table style={{background: 'black', color: 'white' }}>
                                            <Table.Row verticalAlign='middle' >
                                            <Table.Cell style={{padding: 0, cursor: 'pointer'}}>
                                                {gego.Team1} <br/>
                                                {gego.Team2} <br/> 
                                                {gego.MatchDateString}<br/>
                                            </Table.Cell>  
                                            <Table.Cell textAlign='right' style={{color: 'gold', padding: 0, cursor: 'pointer'}}>
                                                {gego.Score1} 
                                                <a style={{marginLeft: '5px'}} className="ui teal label"> {gego.Comment}</a>                                          
                                            </Table.Cell>                     
                                            </Table.Row>                   
                                        </Table>
                                    </Table.Cell>
                                </Table.Row> 
                                })}                                
                            </div>                             
                        )}
                         </Table.Cell> 
                         
                    } )}               
                                       
               </Table.Row>             
            </Table>            
            </div>  
            <div className="twelve wide column"> 
            <UniqueSingleMatch sportId={this.props.sportId} />          
                            
            </div> 
            </div>    
    
            
        )
    }
    
}

const mapStateToProps = ({ liveBetGames, singleMatchLive }) => ({ liveBetGames, singleMatchLive })
export default connect(mapStateToProps,{ fetchLiveBetGames, fetchSingleMatchLive })(SingleMatchLive);