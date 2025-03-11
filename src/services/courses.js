import axios from 'axios'
const baseUrl = 'http://localhost:3000/courses'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newCourse => {
    return axios.post(baseUrl, newCourse)
}

const update = (id, newCourse) => {
    return axios.put(`${baseUrl}/${id}`, newCourse)
}

const deleteCourse = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, update, deleteCourse}