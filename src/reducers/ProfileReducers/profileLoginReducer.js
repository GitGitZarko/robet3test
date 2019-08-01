import { PROFILE_LOGIN } from '../../actions';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export default (state = null, action) => {
    switch (action.type) {
        case PROFILE_LOGIN:
                cookies.set('userToken', action.payload.data.Token, { path: '/' });
            // localStorage.setItem('userToken', JSON.stringify(action.payload.data.Token));
            return action.payload
        default:
            return state

    }

}

