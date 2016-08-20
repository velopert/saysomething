import request from 'utils/request';

export function get() {
    return request('/api/session');
}
