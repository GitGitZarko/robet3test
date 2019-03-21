import { ODDS_TICKET_LIST } from '../actions';

export default (state = [], action) => {
    switch(action.type){
        case ODDS_TICKET_LIST:{
            localStorage.setItem('ticket', JSON.stringify(action.payload));
            return action.payload
        }
        default:
            return state            
    }
   
}

