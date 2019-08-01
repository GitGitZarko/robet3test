
import { FETCH_USER_AGENCY } from '../../actions';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_USER_AGENCY:
            return action.payload
        default:
            return state
    }
}

