import axios from './customize-axios'

const fetchAllUser = (page) => {
    return axios.get(`api/users?page=${page}`)
}

const postCreateNewUser = (name, job) => {
    return axios.post(`/api/users`, { name, job })

}

export {
    fetchAllUser, postCreateNewUser
}