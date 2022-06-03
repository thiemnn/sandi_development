
export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url) {
    let token = localStorage.getItem('token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    let token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    let token = localStorage.getItem('token');
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    let token = localStorage.getItem('token');
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions
function handleResponse(response) {
    return response.text().then(text => {
        if (!response.ok) { 
            if(response.status === 403){
                window.location.href = '/login';
            } else{
                return Promise.reject(text);
            }
        } else{
            try {
                const data = JSON.parse(text);
                return data;
            } catch (e) {
                return Promise.reject(text);
            }
        }
    });
}