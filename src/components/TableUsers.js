import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import './TableUser.scss'
import _, { debounce } from 'lodash';

const TableUsers = (props) => {

    const { listUser, setListUser, totalPages, getAllUser } = props

    const [sortBy, setSortBy] = useState('asc')
    const [sortFiled, setSortField] = useState('id')

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