import { ODDS_TICKET_LIST, REMOVE_ALL_ODDS } from '../actions';

export default (state = [], action) => {
    switch(action.type){
        case ODDS_TICKET_LIST:{
            localStorage.setItem('ticket', JSON.stringify(action.payload));
            return action.payload
        }
        case REMOVE_ALL_ODDS:{             
            return state.Odds = []
        }
        default:
            return state            
    }
   
}

