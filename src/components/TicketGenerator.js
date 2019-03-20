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

    renderujOddListu(){    
        return this.props.oddList.map((name, i) => {
            // console.log('PROPS inside map', name.TournamentCode);
            return (
                <div className="ui middle aligned divided list">
               <TicketChildItem  key={i} objekat={name}/>
               </div>
            )
       })
    }
    
    render() {
    if(this.props.ticket){         
        if(localStorage.getItem("ticket") === null){          
            console.log("KKK: ",this.props.ticket)   
            localStorage.setItem('ticket', JSON.stringify(this.props.ticket));    
        }
    }        
    return (    
            <div style={customStyle}>
               {this.renderujOddListu()}
            </div>
            )
       }
    }   
    
const mapStateToProps = ({ ticket, oddList }) => ({ ticket, oddList})
export default connect(mapStateToProps, { fetchStartJson})(TicketGenerator);