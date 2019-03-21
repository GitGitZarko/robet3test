import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStartJson } from '../actions';
import TicketChildItem from './TicketChildItem';

const customStyle = {
    background: 'yellow'
}
//OVO JE JEDNOSTAVNI BUTTON COMPONENT koji prima samo color prop i textValue zasto
class TicketGenerator extends Component {
    constructor(props) {
        super(props); 
        this.props.fetchStartJson()
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
            <div className="ui items" style={customStyle}>
               {ticketValues && ticketValues.Odds.map((data) => <TicketChildItem data={data}/>)}
            </div>                    
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