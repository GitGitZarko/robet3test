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
import sportViewChamps from './sportViewChampsReducer';
import fetchPlayerReducer from './fetchPlayerReducer';
import fetchSingleMatch from './fetchSingleMatchReducer';

import fetchLiveBetGames from './LiveBetReducers/fetchLiveBetGames';
import fetchLiveCalendar from './LiveBetReducers/LiveCalendarReducer';
import singleMatchLive from './LiveBetReducers/singleMatchLiveReducer';

import changeOddValue from './changeOddValueReducer';
import profileLogin from './ProfileReducers/profileLoginReducer';
import userAgency from './ProfileReducers/userAgencyReducer';

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
        outright: fetchOutright,
        sportView: sportViewChamps,
        players: fetchPlayerReducer,
        singleMatch: fetchSingleMatch,
        liveBetGames: fetchLiveBetGames,
        calendar: fetchLiveCalendar,
        singleMatchLive: singleMatchLive,
        changeOddValue: changeOddValue,
        profileLoginData: profileLogin,
        userAgency: userAgency
        // buttonId: buttonsReducer 
})