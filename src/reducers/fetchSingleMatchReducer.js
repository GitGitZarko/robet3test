import { FETCH_SINGLE_MATCH, REMOVE_SINGLE_MATCH } from '../actions';

export default (state = null, action) => {
    switch(action.type){
        case FETCH_SINGLE_MATCH:
            return action.payload    
        case REMOVE_SINGLE_MATCH:
            return state = null           
        default:
            return state
            
    }
   
}

