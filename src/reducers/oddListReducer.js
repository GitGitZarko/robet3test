import { ODDS_TICKET_LIST } from '../actions';

export default (state = [], action) => {
    switch(action.type){
        case ODDS_TICKET_LIST:
            return [...state, action.payload]
        default:
            return state            
    }
   
}

