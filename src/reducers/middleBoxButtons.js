import { CALL_FROM_BOX } from '../actions';

export default (state = [], action) => {
    switch(action.type){
        case CALL_FROM_BOX:
            return [...state, action.payload]                
        default:
            return state
            
    }
   
}







// export default (state = initialState, action) => {
//     switch(action.type){
//         case CALL_FROM_BOX:
//         const { boxes } = state
//         console.log(boxes) ;
//         if(state.boxes.TournamentCode != action.payload.TournamentCode){
//             return {   
//                 ...state,                             
//                 boxes: state.boxes.concat(action.payload)
//             }
//         }
//         return{
//             ...state,
//             boxes: action.payload
//         }
                
//         default:
//             return state
//     }   
// }