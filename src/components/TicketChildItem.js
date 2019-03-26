import React, { Component } from 'react';
import { connect } from 'react-redux';
import { oddsTicketList } from '../actions';

class TicketChildItem extends Component {
    constructor(props) {
        super(props);  
       
      }

      renderUniqueOdds = () => {
        const { MatchName, OddValue, OddTypeName, MatchId, Odds} = this.props.data
        const currentMatchId = this.props.matchId
        console.log(" trenutni", this.props.data)
        
        // Odds.map((data, i ) =>  {
        //     if(currentMatchId === data.MatchId) alert(data.OddValue)
        //     // return (
        //     // <div className="ui item">
        //     //     <div className="ui left floated content">
        //     //                 <div className="ui header">
        //     //                 {data.MatchId}
        //     //                 </div><br/>                                
        //     //         </div>
        //     //         <div className="ui right floated content">
        //     //                     {/* {OddValue} */}
        //     //             <div className="ui icon button">
        //     //                 <i className="close icon"></i>
        //     //             </div>
        //     //         </div>
        //     // </div>
        //     // )
        //     // return null
        // })
      }
      nestoUradi = (e, mId, OddId) => {
          e.preventDefault();
            // alert(`MatchId: ${mId}, OddId: ${OddId}`)
            let localTicket = JSON.parse(localStorage.ticket) 
             
            localTicket.isLive = false;
            localTicket.matchId = mId;
            localTicket.oddId = OddId;
            localTicket.operationType = 2;
            //localTicket.Bets[0].ColAmount = 200;  // THIS IS HARD CODED, IT IS JUST FOR TESTING
            //console.log("BETOVI :  ", localTicket.Bets[0].ColAmount)
            
   
            localStorage.setItem("ticket", JSON.stringify(localTicket));      
   
         console.log("TIKETARA 44444444444: ", localTicket)
   
         this.props.oddsTicketList(localTicket)
      }
        render() {          
            const { MatchName, OddValue, OddTypeName, MatchId, Odds} = this.props.data
            // console.log("<pre>is childa", Odds.map((a) => a), "</pre>")
            const prom = Odds.map((elem) => elem.MatchId === this.props.matchId ? elem.MatchName : null)
            console.log("asdddddddddddddd", prom)
            const distinctValue = [...new Set(prom)]
        return (
            <div>                
                <div className="ui middle aligned divided list">
                <div className="ui item">
                <div className="ui left floated content">     
                <h4>{distinctValue}</h4>
                </div>
                </div>
                {Odds.map((a) => {
                    return a.MatchId === this.props.matchId ? 
                    <div className="ui item">
                        <div className="ui left floated content">                                
                                    {a.OddGroupName} : {a.OddTypeName}                                                           
                        </div>
                        <div className="ui right floated content">
                        {a.OddValue}
                                
                                    <i className="window close icon" style={{cursor: 'pointer'}} onClick={(e) => this.nestoUradi(e, a.MatchId, a.OddId)}></i>
                            
                        </div>
                     </div>
                     : null
                   
                })}
                </div>
            </div>
        )
       }
    }    
// const mapStateToProps = ({ middleBoxButtons }) => ({ middleBoxButtons })
export default connect(null, { oddsTicketList })(TicketChildItem);
    