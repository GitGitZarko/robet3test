import { PROFILE_LOGIN } from '../../actions';

export default (state = null, action) => {
    switch (action.type) {
        case PROFILE_LOGIN:
            return action.payload
        default:
            return state

    }

}

