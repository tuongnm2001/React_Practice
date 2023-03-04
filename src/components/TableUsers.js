import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import './TableUser.scss'
import _, { debounce } from 'lodash';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import ModalAddNewUser from './ModalAddNewUser';


const TableUsers = (props) => {

    const { listUser, setListUser, totalPages, getAllUser } = props

    const [sortBy, setSortBy] = useState('asc')
    const [sortFiled, setSortField] = useState('id')
    const [dataExport, setDataExport] = useState([])
    const [showModalAddUser, setShowModalAddUser] = useState(false)

    const handlePageClick = (event) => {
        getAllUser(+event.selected + 1)
    }

    const handleSort = (sortBy, sortFiled) => {
        setSortBy(sortBy)
        setSortField(sortFiled)

        let cloneListUser = _.cloneDeep(listUser)
        cloneListUser = _.orderBy(cloneListUser, [sortFiled], [sortBy])
        setListUser(cloneListUser)
    }

    const handleSearch = debounce((event) => {
        let tern = event.target.value
        if (tern) {
            let cloneListUser = _.cloneDeep(listUser)
            cloneListUser = cloneListUser.filter(item => item.email.includes(tern))
            setListUser(cloneListUser);
        } else {
            getAllUser(1);
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
            result.push(['id', 'Email', 'FirstName', 'LastName'])
            //body
            listUser.map((item, index) => {
                let arr = [];
                arr[0] = item.id
                arr[1] = item.email
                arr[2] = item.first_name
                arr[3] = item.last_name
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }

    const handleAddNewUser = () => {
        setShowModalAddUser(true)
    }

    const handleSubmitUser = (user) => {
        setListUser([user, ...listUser])
        console.log('check user : ', user);
    }

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

                <button
                    className='btn-add btn btn-success'
                    onClick={() => handleAddNewUser()}
                >
                    <i className='fa-solid fa-circle-plus'></i> Add New User
                </button>
            </div>

            <div className='table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className='sort-header'>
                                    <span>ID</span>
                                    <span>
                                        <i
                                            onClick={() => handleSort('desc', 'id')}
                                            className="fas fa-arrow-up">
                                        </i>

                                        <i
                                            onClick={() => handleSort('asc', 'id')}
                                            className="fas fa-arrow-down">
                                        </i>
                                    </span>
                                </div>
                            </th>

                            <th>Email</th>

                            <th>
                                <div className='sort-header'>
                                    <span>First Name</span>
                                    <span>

                                        <i
                                            onClick={() => handleSort('desc', 'first_name')}
                                            className="fas fa-arrow-up">

                                        </i>

                                        <i
                                            onClick={() => handleSort('asc', 'first_name')}
                                            className="fas fa-arrow-down">

                                        </i>


                                    </span>
                                </div>
                            </th>

                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            listUser &&
                            listUser.map((item, index) => {
                                return (
                                    <tr key={`user-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => props.handleShowModalEditUser(item)}>
                                                Edit
                                            </button>

                                            <button className='btn btn-danger' onClick={() => props.handleShowDelUser(item)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>

            <ModalAddNewUser
                showModalAddUser={showModalAddUser}
                setShowModalAddUser={setShowModalAddUser}
                getAllUser={getAllUser}
                handleSubmitUser={handleSubmitUser}
            />

            <div className='paginate'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="<< Previous"

                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    activeClassName='active'
                />
            </div>
        </>
    )
}

export default TableUsers;