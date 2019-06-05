import React, { Component } from 'react';
import { connect } from 'react-redux';
//import '../public/css/Sports.css';
import { fetchLiveBetGames, oddsTicketList } from '../../actions';
import { Header, Table, Button, Container, Transition, Grid} from 'semantic-ui-react';

class UniqueSingleMatch extends Component {
    constructor(props) {
        super(props)   
        
    }      
    addOddToTicket = (e, oddCode, matchCode) => {
        e.preventDefault();    
    
        // this.setState({
        //     reRendered: !this.state.reRendered
        // })
    
        let localTicket = JSON.parse(localStorage.ticket)
    
        localTicket.isLive = true;
        localTicket.matchId = matchCode;
        localTicket.oddId = oddCode;
        localTicket.operationType = 1;
    
        localStorage.setItem("ticket", JSON.stringify(localTicket));
        this.props.oddsTicketList(localTicket)
        }
  
    render(){    
        if(!this.props.singleMatchLive) return null;
        const { Bets } = this.props.singleMatchLive
        const single = this.props.singleMatchLive
    
        return (         
            <div >
            <Container fluid style={{marginBottom: '25px'}}>
            {/* <Transition animation='fade' duration={1000} visible={true}> */}
                <div style={{textAlign: 'center',color: 'white', backgroundImage: `url(/images/livebet/${this.props.sportId}.png)`,  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', minHeight:'260px', width: '100%'}}>
                        <h1 style={{color: 'yellow'}}>{single.TournamentName}</h1>
                        <h2>{single.Team1} - {single.Team2}</h2>
                        <h3>{single.Score1}</h3>                        
                </div>
           {/* </Transition> */}
           </Container> 
            <div className="ui two padded grid">
                {   
                    Bets.map((data) => {
                        return <div className="eight wide column" style={{marginBottom: '5px'}}>
                                       <Table fixed>
                                       <Table.Row textAlign='center'>  
                                            <Header>
                                                {data.BetLabel}   
                                            </Header>
                                            </Table.Row>
                                            <Table.Cell width="tvelwe" style={{padding: 0}}>
                                    <Table style={{tableLayout: 'fixed'}}>
                                        {   data.Odds.length > 3 ? 
                                                <div className="ui two padded grid">
                                                {data.Odds.map((ata, k) => {   
                                                    return (                                                                                           
                                                        <div className="eight wide column" style={{marginBottom: '5px', padding: 0}}>  
                                                        <Table fixed> 
                                                        <Table.Cell textAlign='center' style={{padding: 0, background: '#424242', color: 'white', fontWeight: 600}}>
                                                        {ata.OddLabel}                                                         
                                                        </Table.Cell>                                                         
                                                                <Table.Row textAlign='center'>
                                                                    <Table.Cell 
                                                                    style={{ padding: 0, fontWeight: 600, 
                                                                        borderBottom: `3px solid ${ata.Trend === 1 ? '#04f872' : 'black' || ata.Trend === -1 ? 'red' : 'black'}`,                                                                  
                                                                        cursor: 'pointer'}}
                                                                        onClick={(e) => this.addOddToTicket(e, ata.OddId, data.MatchId )}
                                                                        >   
                                                                        {ata.OddValue == 0 ? <i class="lock icon"></i> 
                                                                        : 
                                                                        this.props.changeOddValue == 0 ? ata.OddValue 
                                                                        : 
                                                                        (this.props.changeOddValue == 1 ? ata.OddValueAmerican 
                                                                        : ata.OddValueFraction)}   
                                                                    </Table.Cell>                                                                                                                                                                                          
                                                                </Table.Row>                 
                                                        </Table>
                                                        </div>                       
                                                    )
                                                })}
                                                </div>
                                                :  
                                            data.Odds.map((ata, k) => {   
                                            return (                                                                                           
                                                <Table.Cell textAlign='center'  style={{padding: 0, background: '#424242', color: 'white', fontWeight: 600}}>
                                                    {ata.OddLabel}                                                   
                                                            <Table>
                                                                <Table.Row textAlign='center' verticalAlign='middle'>
                                                               <Table.Cell 
                                                               style={{ padding: 0, fontWeight: 600, 
                                                                   borderBottom: `3px solid ${ata.Trend === 1 ? '#04f872' : 'black' || ata.Trend === -1 ? 'red' : 'black'}`,                                                                  
                                                                   cursor: 'pointer'}}
                                                                   onClick={(e) => this.addOddToTicket(e, ata.OddId, data.MatchId )}
                                                                   >   
                                                                   {ata.OddValue == 0 ? <i class="lock icon"></i> 
                                                                        : 
                                                                        this.props.changeOddValue == 0 ? ata.OddValue 
                                                                        : 
                                                                        (this.props.changeOddValue == 1 ? ata.OddValueAmerican 
                                                                        : ata.OddValueFraction)}   
                                                               </Table.Cell>      
                                                                </Table.Row>                                                    
                                                                </Table>                                                    
                                                </Table.Cell>                        
                                            )
                                        })}                                       
                                    </Table>
                                    </Table.Cell>
                                       </Table>
                        </div>
                    })
                }
                </div>
           </div>   
            
        )
    }
    
}

const mapStateToProps = ({ liveBetGames, singleMatchLive, changeOddValue }) => ({ liveBetGames, singleMatchLive, changeOddValue })
export default connect(mapStateToProps,{ fetchLiveBetGames, oddsTicketList })(UniqueSingleMatch);