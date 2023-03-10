import axios from './customize-axios'

const fetchAllUser = () => {
    return axios.get(`/users/all`)
}

const postCreateNewUser = (email, password, username) => {
    return axios.post(`/users/create`, { email, password, username })
}

const putEditUser = (email, username, id) => {
    return axios.put(`/api/edit-user`, { email, username, id })
}

const deleteUser = (id) => {
    return axios.post(`/users/delete/${id}`)
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