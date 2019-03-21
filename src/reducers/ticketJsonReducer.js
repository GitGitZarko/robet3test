import { FETCH_START_JSON } from '../actions';

export default (state = null, action) => {
    switch(action.type){
        case FETCH_START_JSON:        
            return action.payload                           
        default:
            return state            
    }
   
}


