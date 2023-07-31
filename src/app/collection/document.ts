const server = localStorage.getItem('CRUDSERVER') || '';

//export async function to return await fetch data from the API
export async function get(collection: any, id: any) {
    return await fetch(`${server}/crud/${collection}/${id}`,req('GET', undefined))
        .then(response => response.json())
}

//export async function to post data to the API
export async function post(collection: any, obj: any) {
    return await fetch(`${server}/crud/${collection}`, req('POST', obj))
        .then(response => response.json())
}

//export async function to update data in the API
export async function put(collection: any, obj: any) {
    return await fetch(`${server}/crud/${collection}`,req('PUT', obj))
        .then(response => response.json())
}

//export async function to update data in the API
export async function upsert(collection: any, arrayName: any, obj: any) {
    return await fetch(`${server}/crud/${collection}/upsert/${arrayName}`,req('PUT', obj))
        .then(response => response.json())
}
export async function remove(collection: any, obj: { _id: any; }) {
    return await fetch(`${server}/crud/${collection}/${obj._id}`,req('DELETE', undefined))
    .then(response => response.text())
}

let req = (method: string, body: string | undefined) => { 
    if (typeof body !== 'string') body =  JSON.stringify(body)
    return {
    method: method,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: body
}}

//export async function to return await fetch data from the API
export async function  getNames(collection: any) {
    return await fetch(`${server}/crud/${collection}/names`, req('GET', undefined))
        .then(response => response.json())
    }
//export async function to return await fetch data from the API
export async function getByName(collection: string, name: any) {
    return await fetch(`${server}/crud/${collection}/names/${name}`, req('GET', undefined))
        .then(response => {
            if (response.status === 200) return response.json()
            else throw new Error(response.status+': '+collection+': '+name)
        })
}

// export const utils = {
//     sessionObject: (key) => {
//         let t = sessionStorage.getItem(key)
//         if (t && t !== 'undefined') {
//             return JSON.parse(t)
//         } else {
//             return false
//         }
//     }
// }
