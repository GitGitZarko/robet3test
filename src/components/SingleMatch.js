import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table, Button, SegmentInline, Ref, Grid, Dropdown, Tab, Segment } from 'semantic-ui-react';
import { updateChampList, oddsTicketList, removeChampFromList, fetchSingleMatch } from '../actions';

//import '../public/css/Sports.css';

class SingleMatch extends Component{
    constructor(props) {
        super(props);
        this.state = {           
           reRendered: Boolean         
        }
     }
     
    addOddToTicket = (e, oddCode, matchCode) => {
        e.preventDefault();        
  
        this.setState({
           reRendered: !this.state.reRendered
        })
  
        let localTicket = JSON.parse(localStorage.ticket)
  
        localTicket.isLive = false;
        localTicket.matchId = matchCode;
        localTicket.oddId = oddCode;
        localTicket.operationType = 1;
        //localTicket.Bets[0].ColAmount = 200;  // THIS IS HARD CODED, IT IS JUST FOR TESTING
        //console.log("BETOVI :  ", localTicket.Bets[0].ColAmount)
  
  
        localStorage.setItem("ticket", JSON.stringify(localTicket));
  
        // console.log("TIKETARA", localTicket)
  
        this.props.oddsTicketList(localTicket)
     }

    render(){
        const { singleMatch } = this.props
        let oddIdList = [];     
        
        if (localStorage.getItem("ticket") !== null) {
            let localTicket = JSON.parse(localStorage.getItem('ticket'))
            oddIdList = localTicket.Odds.map((a) => a.OddId)
            console.log("OOOOOOOODDDDDDDDDDDDDDDDDDDD", oddIdList)
        }
    return (
        <div> 
        <div style={{textAlign: 'center', background: 'aliceblue'}}>
        <h1>{singleMatch.name}</h1>
        <h4>{singleMatch.date}</h4>
        </div>
        <Grid celled='internally'>
                                  
               {singleMatch.data.Items.map((data, i) =>      
               <Grid.Row key={i}>                           
                       <Grid.Column width={3}>{data.GroupName}</Grid.Column>
                      
                       <Grid.Column width={13}>
                        {data.OddItems.map((gege,i) => 
                            <div style={{width: '25%', float: 'left', textAlign: 'center'}}>
                            <div style={{ border: '1px solid orange'}}>{gege.Name}</div>                                                        
                            <button 
                            className={`ui ${oddIdList.includes(gege.OddId) ? 'red' : 'blue'} button`} 
                            style={{width: '100%', padding: '10px 0px', margin: '0px 0px 5px 0px', border: '1px solid white'}}
                            onClick={(e) => this.addOddToTicket(e, gege.OddId, singleMatch.mcode)}
                            >
                                {gege.Value}
                            </button>  
                            </div>       
                          )
                           
                           }   
                        </Grid.Column>
                 
                    </Grid.Row>
                    
          )}
               
            </Grid>
          
        </div>       

      
        
    )
    }
}

const mapStateToProps = ({  oddList, singleMatch }) => ({ oddList, singleMatch })
export default connect(mapStateToProps, { updateChampList, oddsTicketList, removeChampFromList, fetchSingleMatch })(SingleMatch);