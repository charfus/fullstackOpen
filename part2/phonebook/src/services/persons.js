import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = async () => {
    const request = await axios.get(baseUrl)
    .then(res => res.data)
    .catch(err => console.log(err))
    console.log(request)
    return request   
}

const create = async (newObj) => {
    const request = await axios.post(baseUrl, newObj)
    .then(res => res.data) // new obj
    return request
}

const update = async (id, newObj) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObj)
    .then(res => res.data)
    return request
}

const delNum = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`)
    .then(res => console.log('after del axios', res.data)) // res.data = {}
    return request
}


export default {
    getAll, create, update, delNum
}