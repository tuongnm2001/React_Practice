import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';

const TableUsers = (props) => {

    const { listUser, totalPages, getAllUser } = props

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