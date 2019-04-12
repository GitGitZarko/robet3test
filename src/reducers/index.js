import { combineReducers } from 'redux';
import champsReducer from './champsReducer';
import champsMainContent from './champsMainContent';
import champsMiddleBoxList from './champsMiddleBoxList';
import middleBoxButtons from './middleBoxButtons';
import ticketJsonReducer from './ticketJsonReducer';
import oddListReducer from './oddListReducer';
import quickBetReducer from './quickBetReducer';
import fetchInEvidence from './fetchInEvidenceReducer';
import fetchOutright from './fetchOutrightReducer';

// import buttonsReducer from './buttonsReducer';

export default combineReducers({
        champs: champsReducer,
        champsContent: champsMainContent,
        champsMiddleBoxList: champsMiddleBoxList,
        middleBoxButtons: middleBoxButtons,
        ticket: ticketJsonReducer,
        oddList: oddListReducer,
        getQuickBet: quickBetReducer,
        inEvidence: fetchInEvidence,
        outright: fetchOutright
        // buttonId: buttonsReducer 
})