import { FETCH_CHAMPS } from '../actions';

export default (state = [], action) => {
    switch(action.type){
        case FETCH_CHAMPS:
            return action.payload
        default:
            return state
    }
   
}