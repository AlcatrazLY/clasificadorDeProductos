import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return async (url, body) => {
        const requestOptions = {
            method,
            headers: {}
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        const response = await fetch(url, requestOptions);
        return handleResponse(response);
    }
}

async function handleResponse(response) {
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson && await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        throw error;
    }
    return data;
}