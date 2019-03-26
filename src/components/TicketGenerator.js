import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStartJson } from '../actions';
import TicketChildItem from './TicketChildItem';

const customStyle = {
    background: 'yellow',
    border: '1px solid black',
    padding: '5px'
}
//OVO JE JEDNOSTAVNI BUTTON COMPONENT koji prima samo color prop i textValue zasto
class TicketGenerator extends Component {
    constructor(props) {
        super(props); 
        this.props.fetchStartJson()
        this.state = {
            storageIsClear: false,
            activeButton: false
        }
      }

    // renderujOddListu(){    
    //     return this.props.oddList.map((name, i) => {
    //         // console.log('PROPS inside map', name.TournamentCode);
    //         return (
    //             <div className="ui middle aligned divided list">
    //            <TicketChildItem  key={i} objekat={name}/>
    //            </div>
    //         )
    //    })
    // }
    removeAllOdds = () => {
        localStorage.clear();
        this.setState({
            storageIsClear: true
        })
        this.props.fetchStartJson()
    }    
    
    renderTicketChildren = (ticketValues) => {
        console.log("Iz funkcije", ticketValues)        
        const prom = ticketValues.Odds.map((a) => a.MatchId)
        const unique = [...new Set(prom)]
        console.log("Iz funkcije 2", unique)

        return unique.map((data, i) => <TicketChildItem key={i} matchId={data} data={ticketValues}/>)
    }

    render() {
    if(this.props.ticket){         
        if(localStorage.getItem("ticket") === null){          
            console.log("KKK: ",this.props.ticket)   
            localStorage.setItem('ticket', JSON.stringify(this.props.ticket));    
        }
    }        
    const ticketValues = JSON.parse(localStorage.getItem('ticket'))
    //if(ticketValues) console.log(ticketValues.Odds.map((data) =>data))
    
   
    return (    
        <div>
             <div className="ui item">
            <div className="ui left floated content">
                        <div className="ui header">
                                Remove all odds 
                        </div>      
                </div>
                <div className="ui right floated content">                                 
                    <div className="ui icon button" onClick={this.removeAllOdds}>
                        <i className="close icon"></i>
                    </div>
                </div>
                
            </div>
            <div className="ui items" style={customStyle}>
            {ticketValues && this.renderTicketChildren(ticketValues)}
                {/* {ticketValues && ticketValues.Odds.map((data, i) => <TicketChildItem key={i} data={data}/>)} */}
                {/* {ticketValues &&  [...(new Set(ticketValues.Odds.map(({ MatchId }) => <button>{MatchId}</button>)))]} */}
                {/* {ticketValues && Array.from(new Set(ticketValues.Odds.map(s => s.MatchId)))
                            .map(MatchId => <button>{MatchId}</button>)
                            } */}  
            </div>   
        
               
                    <button className="ui toggle button" onClick={() => this.setState({ activeButton: false})}>MULTIPLA</button>
                    <button className="ui toggle button" onClick={() => this.setState({ activeButton: true})}>SISTEMA</button>
            {
                this.state.activeButton && ticketValues.Bets.map((data) => {
                    return(
                        <div className="ui middle aligned divided list">
                            <div className="item">
                            <div className="right floated content">
                            <div className="ui input">
                                <input type="text" placeholder="0" />
                                </div>
                            </div>                
                            <div className="ui left floated content">
                            <div class="ui checkbox">
                                <input type="checkbox" name={data.GroupDescription} />
                                <label> { data.GroupDescription}</label>
                            </div>
                               
                            </div>
                            {data.Cols}
                            </div>
                            </div>                            
                       
                    )
                })
            }
            {
                !this.state.activeButton && <div className="ui middle aligned divided list">    
                            <div className="item">
                            <div className="right floated content">
                            <div className="ui input">
                                <input type="text" placeholder="0" />
                                </div>
                            </div>                
                            <div className="content">
                            MULTIPLA
                            </div>
                            
                            </div>
                            </div>                            
            }
                <div className="ui middle aligned divided list">
                <div className="item">
                <div className="right floated content">
                    <div className="ui purple label">{ticketValues && ticketValues.MatchNumber}</div>
                </div>                
                <div className="content">
                    EVENTI
                </div>
                </div>
                <div className="item">
                <div className="right floated content">
                    <div className="ui purple  label">{ticketValues && ticketValues.MaxPerc}</div>
                </div>                
                <div className="content">
                MOLTIPLICAORE
                </div>
                </div>
                <div className="item">
                <div className="right floated content">
                    <div className="ui purple  label">{ticketValues && ticketValues.Cols}</div>
                </div>                
                <div className="content">
                    COLONNE
                </div>
                </div>
                <div className="item">
                <div className="right floated content">
                    <div className="ui purple  label">{ticketValues && ticketValues.MaxBonus}</div>
                </div>                
                <div className="content">
                    BONUS MAX
                </div>
                </div>
                <div className="item">
                <div className="right floated content">
                    <div className="ui purple  label">{ticketValues && ticketValues.MinBonus}</div>
                </div>                
                <div className="content">
                    BONUS MIN
                </div>
                </div>
                <div className="item">
                <div className="right floated content">
                    <div className="ui purple  label">{ticketValues && ticketValues.MaxWin}</div>
                </div>                
                <div className="content">
                    VINCITA MAX
                </div>
                </div>
                <div className="item">
                <div className="right floated content">
                    <div className="ui purple  label">{ticketValues && ticketValues.MinWin}</div>
                </div>                
                <div className="content">
                    VINCITA MIN
                </div>
                </div>
                <div className="item">
                <div className="right floated content">
                    <div className="ui purple  label">{ticketValues && ticketValues.MaxTotalWin}</div>
                </div>                
                <div className="content">
                VINCITA TOTALE MAX
                </div>
                </div>
                <div className="item">
                <div className="right floated content">
                    <div className="ui purple  label">{ticketValues && ticketValues.MinTotalWin}</div>
                </div>                
                <div className="content">
                VINCITA TOTALE MIN
                </div>
                </div>
                </div>
        </div>
            )
       }
    }   
    
const mapStateToProps = ({ ticket, oddList }) => ({ ticket, oddList})
export default connect(mapStateToProps, { fetchStartJson})(TicketGenerator);