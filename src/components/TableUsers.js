import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';

const TableUsers = () => {

    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUser] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        getAllUser(1);
    }, [])

    const getAllUser = async (page) => {
        let res = await fetchAllUser(page);
        console.log(res);
        if (res && res.data) {
            setTotalUser(res.total)
            setListUser(res.data)
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getAllUser(+event.selected + 1)
    }

    return (
        <>
            <div className='table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>First Name</th>
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