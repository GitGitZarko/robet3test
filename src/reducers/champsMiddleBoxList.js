import { ADD_CHAMP_TO_LIST } from '../actions';

export default (state = [], action) => {
    switch(action.type){
        case ADD_CHAMP_TO_LIST: {
            const existsInArray = state.some(l => l.TournamentCode === action.payload.TournamentCode)
            if(existsInArray) {
              return state;
        }
            // console.log(action.payload.TournamentCode)
        return [...state, action.payload]             
            
        
    }

    
        default:
            return state
    }   
}



// const updatedList = state.map(item =>{
//     if(item.TournamentCode === action.payload.TournamentCode)                    
//     return item;
// })
// return [...state, action.payload]


// return [...state, action.payload].filter(ev => {
//     if(!ev.TournamentCode === action.payload.TournamentCode){
//        return {ev}
//     }
// });