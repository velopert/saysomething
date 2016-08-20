import axios from 'axios';

export default function request(url, method = 'get', data, config) {
    return axios({
        method,
        url,
        data,
        ...config
    }).then(
        response => {
            return {response};
        }
    ).catch(
        error => {
            return {error};
        }
    );
}
