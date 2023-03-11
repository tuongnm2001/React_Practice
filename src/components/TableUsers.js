import { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import './TableUser.scss'
import _, { debounce } from 'lodash';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import ModalAddNewUser from './ModalAddNewUser';
import Login from './Login';
import { fetchAllUser } from '../services/UserService';
import { UserContext } from '../context/UserContext';
import ModalEditUser from './ModalEditUser'
import ModalDelUser from './ModalDelUser';
import { HiArrowsUpDown } from 'react-icons/hi2';
import Pagination from './Pagination/Pagination';
import { paginate } from './Pagination/paginate';

const TableUsers = (props) => {
    const { user, loginContext } = useContext(UserContext)

    const [listUser, setListUser] = useState({})

    const [dataExport, setDataExport] = useState([])
    const [showModalAddUser, setShowModalAddUser] = useState(false)
    const [sortUpDown, setSortUpDown] = useState(false);
    const [loading, setLoading] = useState(false)
    const [showModalEditUser, setShowModalEditUser] = useState(false)
    const [showModalDelUser, setShowModalDelUser] = useState(false)
    const [dataEditUser, setDataEditUser] = useState({})
    const [dataDelUser, setDataDelUser] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6;

    useEffect(() => {
        getAllUser();
    }, [])

    const getAllUser = async () => {
        setLoading(false)
        let res = await fetchAllUser();
        if (res && res.length > 0) {
            setListUser(res)
        }
        setLoading(true)
    }

    const handleShowModalEditUser = (user) => {
        setShowModalEditUser(true)
        setDataEditUser(user);
    }

    const handleShowDelUser = (user) => {
        setShowModalDelUser(true)
        setDataDelUser(user);
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUser(cloneListUser)
    }


    const handleSearch = debounce((event) => {
        let tern = event.target.value
        if (tern) {
            let cloneListUser = _.cloneDeep(listUser)
            cloneListUser = cloneListUser.filter(item => item.email.includes(tern))
            setListUser(cloneListUser);
        } else {
            getAllUser();
        }
    }, 300)

    const handleImportCSV = (event) => {

        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== 'text/csv') {
                toast.error('Only accept csv files...')
                return;
            }

            // Parse local CSV file
            Papa.parse(file, {
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] !== 'email'
                                ||
                                rawCSV[0][1] !== 'first_name'
                                ||
                                rawCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('Wrong format Header CSV file!')
                            } else {
                                let result = []
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]
                                        result.push(obj)
                                    }
                                })
                                setListUser(result)
                            }
                        } else {
                            toast.error('Wrong format CSV file!')
                        }
                    } else {
                        toast.error('Not found data on CSV file')
                    }
                    console.log("Finished:", results.data);
                }
            });
        }
    }

    const getUsersExport = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            //header
            result.push(['id', 'email', 'username'])
            //body
            listUser.map((item, index) => {
                let arr = [];
                arr[0] = item.id
                arr[1] = item.email
                arr[2] = item.username
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }

    const handleAddNewUser = () => {
        setShowModalAddUser(true)
    }


    const handleSortEmail = () => {
        const sortEmailUp = _.orderBy(listUser, ['email'], ['asc'])
        const sortEmailDown = _.orderBy(listUser, ['email'], ['desc'])
        setSortUpDown(!sortUpDown)


        if (sortUpDown === true) {
            setListUser(sortEmailDown)
        }
        if (sortUpDown === false) {
            setListUser(sortEmailUp)
        }
    }

    const handleSortUsername = () => {
        const sortUsernameUp = _.orderBy(listUser, ['username'], ['asc'])
        const sortUsernameDown = _.orderBy(listUser, ['username'], ['desc'])
        setSortUpDown(!sortUpDown)


        if (sortUpDown === true) {
            setListUser(sortUsernameDown)
        }
        if (sortUpDown === false) {
            setListUser(sortUsernameUp)
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const paginateListUser = paginate(listUser, currentPage, pageSize);

    return (
        <>
            <div className='col-4 my-3'>
                <input
                    className='form-control'
                    placeholder='Search user by email'
                    // value={keyword}
                    onChange={(event) => handleSearch(event)}
                />
            </div>

            <div className='btn-add-import'>

                <button
                    className='btn-add btn btn-success'
                    onClick={() => handleAddNewUser()}
                >
                    <i className='fa-solid fa-circle-plus'></i> Add New User
                </button>

                <label className='btn-import' htmlFor='test'><i className='fa-solid fa-file-import'></i> Import</label>
                <input
                    type={'file'}
                    id='test'
                    onChange={(event) => handleImportCSV(event)}
                    hidden
                />
                <CSVLink
                    filename={'user.csv'}
                    className='csvLink'
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getUsersExport}

                >
                    <i className='fa-solid fa-file-arrow-down'></i> Export
                </CSVLink>
            </div>

            <div className='table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th >
                                Email <HiArrowsUpDown className='arrow' onClick={() => handleSortEmail()} />
                            </th>
                            <th>Password</th>
                            <th>
                                Username <HiArrowsUpDown className='arrow' onClick={() => handleSortUsername()} />
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            paginateListUser && paginateListUser.length > 0 &&
                            paginateListUser.map((item, index) => {
                                return (
                                    <tr key={`user-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{'******'}</td>
                                        <td>{item.username}</td>
                                        <td>
                                            <button className='btn btn-warning mx-3' onClick={() => handleShowModalEditUser(item)}>
                                                <i className="fas fa-user-edit"></i> Update
                                            </button>
                                            <button className='btn btn-danger' onClick={() => handleShowDelUser(item)}>
                                                <i className="fas fa-user-times"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
            </div>

            {
                loading === false &&
                <i className="fas fa-spinner fa-pulse spiner"></i>
            }

            <div className='paginate'>
                {
                    loading &&
                    <Pagination
                        items={listUser.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                }
            </div>

            <div className='modal-addUser'>
                <ModalAddNewUser
                    showModalAddUser={showModalAddUser}
                    setShowModalAddUser={setShowModalAddUser}
                    getAllUser={getAllUser}
                />
            </div>

            <ModalEditUser
                showModalEditUser={showModalEditUser}
                setShowModalEditUser={setShowModalEditUser}
                dataEditUser={dataEditUser}
                handleShowModalEditUser={handleShowModalEditUser}
                getAllUser={getAllUser}
            />

            <ModalDelUser
                showModalDelUser={showModalDelUser}
                setShowModalDelUser={setShowModalDelUser}
                dataDelUser={dataDelUser}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
                getAllUser={getAllUser}

            />
        </>
    )
}

export default TableUsers;