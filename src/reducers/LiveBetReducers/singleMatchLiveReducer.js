import { FETCH_SINGLE_MATCH_LIVE } from '../../actions';

export default (state = null, action) => {
    switch(action.type){
        case FETCH_SINGLE_MATCH_LIVE:
            return action.payload             
        default:
            return state
            
    }
   
}


