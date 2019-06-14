import { FETCH_CASINO_GAMES } from '../../actions';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CASINO_GAMES:
            return action.payload
        default:
            return state

    }

}

