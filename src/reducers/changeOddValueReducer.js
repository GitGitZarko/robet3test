import { CHANGE_ODD_VALUE } from '../actions';
let oddTypeValue = JSON.parse(localStorage.OddType)

export default (state = oddTypeValue, action) => {
    switch(action.type){
        case CHANGE_ODD_VALUE:
            localStorage.setItem('OddType', JSON.stringify(action.payload));
            return action.payload             
        default:
            return state
            
    }
   
}

