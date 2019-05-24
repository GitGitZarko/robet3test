import { FETCH_LIVE_BET_GAMES } from '../../actions';

export default (state = null, action) => {
    switch(action.type){
        case FETCH_LIVE_BET_GAMES:
            return action.payload             
        default:
            return state
            
    }
   
}

