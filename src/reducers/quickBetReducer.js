import { GET_QUICK_BET } from '../actions';

export default (state = [], action) => {
    
    switch(action.type){
        case GET_QUICK_BET:           
            return action.payload
        default:
            return state
    }   
}

