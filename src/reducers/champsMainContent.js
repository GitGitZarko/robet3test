import { FETCH_CHAMP_LIST } from '../actions';

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_CHAMP_LIST:
            return action.payload
        default:
            return state
    }   
}