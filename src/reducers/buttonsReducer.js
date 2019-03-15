import { FIRST_LEVEL_BUTTON_ID } from '../actions';

export default (state = null, action) => {
    switch(action.type){
        case FIRST_LEVEL_BUTTON_ID:
            return action.payload             
        default:
            return state
            
    }
   
}

