import axios from 'axios';

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export default axios.create({
    baseURL: `http://www.betvip.fun/Profile`,
})