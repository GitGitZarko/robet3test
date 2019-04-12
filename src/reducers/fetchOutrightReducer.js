import { FETCH_STRUCTURE_OUTRIGHT } from '../actions';

export default (state = [], action) => {
    switch(action.type){
        case FETCH_STRUCTURE_OUTRIGHT:
            return action.payload
        default:
            return state
    }
   
}