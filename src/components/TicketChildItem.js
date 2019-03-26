import React, { Component } from 'react';


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
            alert(`MatchId: ${mId}, OddId: ${OddId}`)
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
                <h5>{distinctValue}</h5>
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
export default TicketChildItem;