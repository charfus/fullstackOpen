import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = async () => {
    const request = await axios.get(baseUrl)
    .then(res => res.data)
    .catch(err => console.error(err))   
    return request // res.data
}

const create = async (newObj) => {
    const request = await axios.post(baseUrl, newObj)
    .then(res => res.data)
    .catch(err => console.error(err))
    return request // res.data
}

const update = async (id, newObj) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObj)
    .then(res => res.data)    
    return request // res.data
}

const delNum = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`)
    .then(res => console.log(res.data)) // res.data = {}
    .catch(err => console.error(err))
    return request
}


export default {
    getAll, create, update, delNum
}