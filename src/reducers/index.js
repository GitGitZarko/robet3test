import { combineReducers } from 'redux';
import champsReducer from './champsReducer';
import champsMainContent from './champsMainContent';
import champsMiddleBoxList from './champsMiddleBoxList';

export default combineReducers({
        champs: champsReducer,
        champsContent: champsMainContent,
        champsMiddleBoxList: champsMiddleBoxList    
})