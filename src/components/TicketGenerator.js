import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStartJson } from '../actions';
import TicketChildItem from './TicketChildItem';


//OVO JE JEDNOSTAVNI BUTTON COMPONENT koji prima samo color prop i textValue zasto
class TicketGenerator extends Component {
    constructor(props) {
        super(props); 
        this.props.fetchStartJson()   
       
        
      }

      addJsonToLocalStorage = () =>{    
        const local = localStorage.getItem('ticket');
        if(!local){
            localStorage.setItem('ticket', JSON.stringify(this.props.ticket));
            // JSON.parse(local);
            // if(local.Guid !== this.props.ticket.Guid)
        }

      }
     renderujOddListu(){
        // const { TournamentCode } = this.props.champsMiddleBoxList;
        // console.log('PROPS champsMiddleBoxList', this.props.champsMiddleBoxList);
        // if (!TournamentCode) {
        //    return null;
        // }
        return this.props.oddList.map(name => {
            // console.log('PROPS inside map', name.TournamentCode);
            return (
                <div className="ui middle aligned divided list">
               <TicketChildItem  objekat={name}/>
               </div>
            )
       })
    }

        render() {               
            {this.addJsonToLocalStorage()}
        return (    
            <div>
               {this.renderujOddListu()}
               </div>
            )
       }
    
    }   
    
const mapStateToProps = ({ ticket, oddList }) => ({ ticket, oddList})
export default connect(mapStateToProps, { fetchStartJson})(TicketGenerator);