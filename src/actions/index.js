import betvipApi from '../apis/betvipApi';

export const FETCH_CHAMPS = 'FETCH_CHAMPS';
export const FETCH_CHAMP_LIST = 'FETCH_CHAMP_LIST';
export const ADD_CHAMP_TO_LIST = 'ADD_CHAMP_TO_LIST';


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