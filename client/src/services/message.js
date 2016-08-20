import request from 'utils/request';

export function fetch({initial, latest=false, pivot}) {
    // load inital data
    if(initial) {
        return request('/api/message');
    }
    if(latest) {
        return request(`/api/message/recent/${pivot}`, 'get', {}, { timeout: 30 * 1000 });
    } else {
        return request(`/api/message/old/${pivot}`);
    }
}

export function write({message, uid}) {
    return request('/api/message', 'post', { message, uid });
}
