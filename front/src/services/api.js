const BaseUrl = 'http://localhost:3001';

async function request(url, method, data) {

    if(data){
        var urlencoded = new URLSearchParams();
        urlencoded.append("mensaje", data.mensaje);
    }else{
        data = undefined;
    }

    const response = await fetch(`${BaseUrl}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlencoded,
    });

    const jsonResponse = await response.json();
    return jsonResponse;
}

export async function update(id, data) {
    return request('/mensajes/' + id, 'PUT', data);
}

export function create(data) {
    return request('/mensajes', 'POST', data);
}

export function read() {
    return request('/mensajes', 'GET');
}

export function remove(id) {
    return request(`/mensajes/${id}`, 'DELETE');
}
