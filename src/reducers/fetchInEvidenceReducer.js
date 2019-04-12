import { FETCH_IN_EVIDENCE } from '../actions';

export default (state = [], action) => {
    switch(action.type){
        case FETCH_IN_EVIDENCE:
            return action.payload
        default:
            return state
    }
   
}