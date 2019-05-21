import betvipApi from '../apis/betvipApi';

export const FETCH_CHAMPS = 'FETCH_CHAMPS';
export const FETCH_CHAMP_LIST = 'FETCH_CHAMP_LIST';
export const ADD_CHAMP_TO_LIST = 'ADD_CHAMP_TO_LIST';
export const REMOVE_CHAMP_FROM_LIST = 'REMOVE_CHAMP_FROM_LIST';
export const CALL_FROM_BOX = 'CALL_FROM_BOX';
export const UPDATE_CHAMP_LIST = 'UPDATE_CHAMP_LIST';
export const FETCH_START_JSON = 'FETCH_START_JSON';
export const ODDS_TICKET_LIST = 'ODDS_TICKET_LIST';
export const REMOVE_ALL_ODDS = 'REMOVE_ALL_ODDS';
export const GET_QUICK_BET = 'GET_QUICK_BET';
export const FETCH_IN_EVIDENCE = 'FETCH_IN_EVIDENCE';
export const FETCH_STRUCTURE_OUTRIGHT = 'FETCH_STRUCTURE_OUTRIGHT';
export const FETCH_STRUCTURE_PLAYER = 'FETCH_STRUCTURE_PLAYER';
export const SPORT_VIEW_CHAMPS = 'SPORT_VIEW_CHAMPS';
export const FETCH_SINGLE_MATCH = 'FETCH_SINGLE_MATCH';
export const REMOVE_SINGLE_MATCH = 'REMOVE_SINGLE_MATCH';
// export const FIRST_LEVEL_BUTTON_ID = 'FIRST_LEVEL_BUTTON_ID';

export const fetchSingleMatch = (singleMatchCode = null, date = null, name = null) => async dispatch => {
  const response = await betvipApi.get(`/Match?id=${singleMatchCode}`);
  dispatch({ type: FETCH_SINGLE_MATCH, payload: { data: response.data, date: date, name: name }});
}

export const removeSingleMatch = (s) => async dispatch => {  
  dispatch({ type: REMOVE_SINGLE_MATCH });
}

export const sportViewChamps = (sportId) => {
  return {
    type: SPORT_VIEW_CHAMPS,
    payload: sportId
  }
};

export const quickBetAction = (matchCode) => async dispatch => {
  const response = await betvipApi.get(`/Quick?id=${matchCode}`);
  console.log("Iz akcije: ", response.data)
  dispatch({ type: GET_QUICK_BET, payload: response.data });
}

export const removeAllOdds = () => {
  return {
    type: REMOVE_ALL_ODDS
  }
};

export const oddsTicketList = (oddObject) => async dispatch => {
  console.log("CONSOLE LOOOOOOOOOOOOOOOOOOOOOG!", oddObject)
  await betvipApi.post("/Update", JSON.stringify(oddObject))
    .then(
      response => dispatch({ type: ODDS_TICKET_LIST, payload: response.data }),//console.log("ODGOVOR SERVERA:  ", response),
      error => console.log("ODGOVOR SERVERA", error),
    );
}

export const fetchStartJson = () => async dispatch => {
  const response = await betvipApi.get(`/Start`);
  dispatch({ type: FETCH_START_JSON, payload: response.data });
}

export const fetchChamps = () => async dispatch => {
  const response = await betvipApi.get(`/structure?q=0`);
  dispatch({ type: FETCH_CHAMPS, payload: response.data.Sports });
}

export const fetchInEvidence = () => async dispatch => {
  const response = await betvipApi.get(`/inEvidence`);
  dispatch({ type: FETCH_IN_EVIDENCE, payload: response.data });
}
export const fetchStructureOutright = () => async dispatch => {
  const response = await betvipApi.get(`/structureOutright`);
  dispatch({ type: FETCH_STRUCTURE_OUTRIGHT, payload: response.data.Sports });
}

export const fetchStructurePlayer = () => async dispatch => {
  const response = await betvipApi.get(`/structurePlayer`);
  dispatch({ type: FETCH_STRUCTURE_PLAYER, payload: response.data.Sports });
}

export const fetchChampList = (champId = null, sportId = null) => async dispatch => {
  const response = await betvipApi.get(`/tournament?c=${champId}&s=${sportId}`);

  dispatch({ type: FETCH_CHAMP_LIST, payload: response.data });
}

export const addChampToList = (champId = null, sportId = null, ante = null, player = null) => async dispatch => {
  if (!ante && !player) {
    const response = await betvipApi.get(`/tournament?c=${champId}&s=${sportId}`);
    dispatch({ type: ADD_CHAMP_TO_LIST, payload: response.data });
  } else if (ante && !player) {
    const response = await betvipApi.get(`/TournamentOutright?m=${champId}`);
    dispatch({ type: ADD_CHAMP_TO_LIST, payload: response.data });
  } else if (!ante && player) {
    const response = await betvipApi.get(`/TournamentPlayer?m=${champId}`);
    dispatch({ type: ADD_CHAMP_TO_LIST, payload: response.data });
  }

}
export const removeChampFromList = (champId = null, sportId = null) => {
  return {
    type: REMOVE_CHAMP_FROM_LIST,
    payload: { champId: champId, sportId: sportId }
  }
};
// export const firstLevelButtonId = (buttonId = null) => {
//     return {
//       type: FIRST_LEVEL_BUTTON_ID,
//       payload: buttonId
//     }
//   };

export const callFromBox = (champId = null, sportId = null, button = null) => async dispatch => {
  const response = await betvipApi.get(`/tournament?c=${champId}&s=${sportId}&g=${button}`);
  console.log("akcija", response.data)
  dispatch({ type: CALL_FROM_BOX, payload: response.data });
}

export const updateChampList = (champId = null, sportId = null, button = null) => async dispatch => {
  const response = await betvipApi.get(`/tournament?c=${champId}&s=${sportId}&g=${button}`);
  dispatch({ type: UPDATE_CHAMP_LIST, payload: response.data });
}

