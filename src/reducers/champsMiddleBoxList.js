import { ADD_CHAMP_TO_LIST, REMOVE_CHAMP_FROM_LIST, UPDATE_CHAMP_LIST } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case ADD_CHAMP_TO_LIST: {
            const existsInArray = state.some(l => l.TournamentCode === action.payload.TournamentCode)
            if (existsInArray) {
                return state;
            }

            // console.log(action.payload.TournamentCode)
            return [...state, action.payload]
        }
        case REMOVE_CHAMP_FROM_LIST: {
            const existsInArray = state.some(l => l.TournamentCode == action.payload.champId)
            // //console.log("DA LI JE MOGUCE" + existsInArray)
            // //state.filter(item => console.log(item.TournamentCode+"champ"+action.payload.champId))
            if (existsInArray) {
                return state.filter(l => l.TournamentCode != action.payload.champId)
            }
            return state
            //     const actionId = action.payload.champId;    
            //    const sss = state.map(() =>)

            //     console.log(state.TournamentCode+"ss");        
        }
        case UPDATE_CHAMP_LIST: {
            return state.map((item, index) => {
                console.log("itemitem: ", index, "tour code: ", item.TournamentCode, "payload COde", action.payload.TournamentMatchList)
                if (item.TournamentCode === action.payload.TournamentCode) {
                    return item, action.payload
                }
                return item
            })

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