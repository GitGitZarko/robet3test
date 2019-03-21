import betvipApi from '../apis/betvipApi';

export const FETCH_CHAMPS = 'FETCH_CHAMPS';
export const FETCH_CHAMP_LIST = 'FETCH_CHAMP_LIST';
export const ADD_CHAMP_TO_LIST = 'ADD_CHAMP_TO_LIST';
export const REMOVE_CHAMP_FROM_LIST = 'REMOVE_CHAMP_FROM_LIST';
export const CALL_FROM_BOX = 'CALL_FROM_BOX';
export const UPDATE_CHAMP_LIST = 'UPDATE_CHAMP_LIST';
export const FETCH_START_JSON = 'FETCH_START_JSON';
export const ODDS_TICKET_LIST = 'ODDS_TICKET_LIST';
// export const FIRST_LEVEL_BUTTON_ID = 'FIRST_LEVEL_BUTTON_ID';

  export const oddsTicketList = (oddObject) => async dispatch =>{
    //console.log("LOG IZ AKCIJE: ", oddObject)  
    await betvipApi.post("/Update",  JSON.stringify(oddObject))
    .then(
      response => dispatch({ type: ODDS_TICKET_LIST, payload: response.data }),//console.log("ODGOVOR SERVERA:  ", response),
      error => console.log("ODGOVOR SERVERA", error)    
    );    

}

export const fetchStartJson = () =>  async dispatch => {
    const response =  await betvipApi.get(`/Start`);        
dispatch({ type: FETCH_START_JSON, payload: response.data });  
}

export const fetchChamps = () =>  async dispatch => {
        const response =  await betvipApi.get(`/structure?q=0`);        
    dispatch({ type: FETCH_CHAMPS, payload: response.data.Sports });  
}

export const fetchChampList = (champId = null, sportId = null ) =>  async dispatch => {
    const response =  await betvipApi.get(`/tournament?c=${champId}&s=${sportId}`);    

dispatch({ type: FETCH_CHAMP_LIST, payload: response.data });  
}

export const addChampToList = (champId = null, sportId = null ) =>  async dispatch => {
    const response =  await betvipApi.get(`/tournament?c=${champId}&s=${sportId}`);    

dispatch({ type: ADD_CHAMP_TO_LIST, payload: response.data });  
}
export const removeChampFromList = (champId = null, sportId = null) => {
    return {
      type: REMOVE_CHAMP_FROM_LIST,
      payload: {champId: champId, sportId: sportId}
    }
  };
// export const firstLevelButtonId = (buttonId = null) => {
//     return {
//       type: FIRST_LEVEL_BUTTON_ID,
//       payload: buttonId
//     }
//   };

export const callFromBox = (champId = null, sportId = null, button = null) =>  async dispatch => {
    const response =  await betvipApi.get(`/tournament?c=${champId}&s=${sportId}&g=${button}`);    
    console.log("akcija", response.data)
    dispatch({ type: CALL_FROM_BOX, payload: response.data });  
}
  
export const updateChampList = (champId = null, sportId = null, button = null) => async dispatch => {
    const response = await betvipApi.get(`/tournament?c=${champId}&s=${sportId}&g=${button}`);
    dispatch({ type: UPDATE_CHAMP_LIST, payload: response.data });
}

