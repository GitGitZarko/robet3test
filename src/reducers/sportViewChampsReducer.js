import { SPORT_VIEW_CHAMPS } from '../actions';

export default (state = 0, action) => {
    switch(action.type){
        case SPORT_VIEW_CHAMPS:        
        return action.payload        
        default:
            return state
    }
   
}