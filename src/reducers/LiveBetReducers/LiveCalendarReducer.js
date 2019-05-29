import { FETCH_LIVE_CALENDAR } from '../../actions';

export default (state = null, action) => {
    switch(action.type){
        case FETCH_LIVE_CALENDAR:
            return action.payload             
        default:
            return state
            
    }
   
}


