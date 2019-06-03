import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Table, Button, SegmentInline, Ref, Grid, Dropdown, Tab, Segment } from 'semantic-ui-react';
import { updateChampList, oddsTicketList, removeChampFromList, fetchSingleMatch, removeSingleMatch } from '../actions';

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
        
        localStorage.setItem("ticket", JSON.stringify(localTicket));        
  
        this.props.oddsTicketList(localTicket)
     }

    render(){
        const { singleMatch } = this.props
        let oddIdList = [];     
        
        if (localStorage.getItem("ticket") !== null) {
            let localTicket = JSON.parse(localStorage.getItem('ticket'))
            oddIdList = localTicket.Odds.map((a) => a.OddId)            
        }
    return (
        <div> 
        <div className="ui main  clearing segment" style={{textAlign: 'center', background: 'aliceblue'}}>
        <button className="ui right floated icon button" onClick={() => this.props.removeSingleMatch()}>
                  <i className="close icon"></i>
        </button>
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
                                {this.props.changeOddValue == 0 ? gege.OddValue : (this.props.changeOddValue == 1 ? gege.OddValueAmerican : gege.OddValueFraction) }
                                {/* {gege.OddValue} */}
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

const mapStateToProps = ({  oddList, singleMatch, changeOddValue }) => ({ oddList, singleMatch, changeOddValue })
export default connect(mapStateToProps, { updateChampList, oddsTicketList, removeChampFromList, fetchSingleMatch, removeSingleMatch })(SingleMatch);