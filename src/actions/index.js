import betvipApi from '../apis/betvipApi';
import liveBetApi from '../apis/liveBetApi';
import profileApi from '../apis/profileApi';
import casinoApi from '../apis/casinoApi';

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

export const CHANGE_ODD_VALUE = 'CHANGE_ODD_VALUE';

// LIVE SPORT PAGE CONSTANTS - START 

export const FETCH_LIVE_BET_GAMES = 'FETCH_LIVE_BET_GAMES';
export const FETCH_LIVE_CALENDAR = 'FETCH_LIVE_CALENDAR';
export const FETCH_SINGLE_MATCH_LIVE = 'FETCH_SINGLE_MATCH_LIVE';

// LIVE SPORT PAGE CONSTANTS - END

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

// PROFILE API - START 
export const PROFILE_LOGIN = 'PROFILE_LOGIN';
export const FETCH_USER_AGENCY = 'FETCH_USER_AGENCY';

// PROFILE API - END

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

// CASINO API - START 
export const FETCH_CASINO_GAMES = 'FETCH_CASINO_GAMES';

// CASINO API - END

// |||||---------~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~------ ||||| //

// CASINO ACTIONS - START 

export const fetchCasinoGames = (id) => async dispatch => {
  const response = await casinoApi.get(`/Games?${id}`);
  dispatch({ type: FETCH_CASINO_GAMES, payload: response.data });
}

// CASINO ACTIONS - END 

// PROFILE ACTIONS - START 

export const profileLogin = (user, pass) => async dispatch => {
  await profileApi.post("/ProfileLoginService", {
    username: user, password: pass,
  })
    .then(
      response => dispatch({ type: PROFILE_LOGIN, payload: response }),
      error => console.log("ODGOVOR SERVERA", error),
    );
}

export const fetchUserAgency = () => async dispatch => {
  const response = await profileApi.get(`/UsersAgency`, {


  });
  dispatch({ type: FETCH_USER_AGENCY, payload: response.data });
}
// PROFILE ACTIONS - END 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

// LIVE SPORT PAGE ACTIONS - START 
export const fetchLiveBetGames = (rand, sportId) => async dispatch => {
  const response = await liveBetApi.get(`/Overview?r=${rand}&sportId=${sportId}`);
  dispatch({ type: FETCH_LIVE_BET_GAMES, payload: response.data });
}
export const fetchLiveCalendar = (rand, sportId) => async dispatch => {
  const response = await liveBetApi.get(`/Calendar?r=${rand}&id=${sportId}`);
  dispatch({ type: FETCH_LIVE_CALENDAR, payload: response.data });
}
export const fetchSingleMatchLive = (rand, sportId) => async dispatch => {
  const response = await liveBetApi.get(`/single?id=${sportId}&r=${rand}`);
  dispatch({ type: FETCH_SINGLE_MATCH_LIVE, payload: response.data });
}
// LIVE SPORT PAGE ACTIONS - END 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


export const fetchSingleMatch = (singleMatchCode = null, date = null, name = null) => async dispatch => {
  const response = await betvipApi.get(`/Match?id=${singleMatchCode}`);
  dispatch({ type: FETCH_SINGLE_MATCH, payload: { data: response.data, date: date, name: name, mcode: singleMatchCode } });
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

export const changeOddValueType = (value) => {
  return {
    type: CHANGE_ODD_VALUE,
    payload: value
  }
};

export const quickBetAction = (matchCode) => async dispatch => {
  const response = await betvipApi.get(`/Quick?id=${matchCode}`);
  dispatch({ type: GET_QUICK_BET, payload: response.data });
}

export const removeAllOdds = () => {
  return {
    type: REMOVE_ALL_ODDS
  }
};

export const oddsTicketList = (oddObject) => async dispatch => {
  await betvipApi.post("/Update", JSON.stringify(oddObject))
    .then(
      response => dispatch({ type: ODDS_TICKET_LIST, payload: response.data }),
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
  dispatch({ type: CALL_FROM_BOX, payload: response.data });
}

export const updateChampList = (champId = null, sportId = null, button = null) => async dispatch => {
  const response = await betvipApi.get(`/tournament?c=${champId}&s=${sportId}&g=${button}`);
  dispatch({ type: UPDATE_CHAMP_LIST, payload: response.data });
}

