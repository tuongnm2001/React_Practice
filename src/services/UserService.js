import axios from './customize-axios'

const fetchAllUser = (page) => {
    return axios.get(`api/users?page=${page}`)
}

const postCreateNewUser = (name, job) => {
    return axios.post(`/api/users`, { name, job })
}

const putEditUser = (page, name, job) => {
    return axios.put(`/api/users/${page}`, { name, job })
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

const loginApi = (email, password) => {
    return axios.post(`/api/login`, { email, password })
}

export {
    fetchAllUser,
    postCreateNewUser,
    putEditUser,
    deleteUser,
    loginApi
}