import _ from "lodash";

const Pagination = (props) => {

    const { items, pageSize, currentPage, onPageChange } = props

    const pageCount = items / pageSize;
    if (Math.ceil(pageCount) === 1) return null;

    const pages = _.range(1, pageCount + 1);

    const totalPages = Math.ceil(items / pageSize)

    const handlePrevPage = () => {
        onPageChange(currentPage - 1)
    }

    const handleNextPage = () => {
        onPageChange(currentPage + 1)
    }

    return (
        <nav>
            <ul className="pagination">
                <li
                    className={currentPage === 1 ? "page-item disabled" : "page-item"}

                >
                    <a className="page-link" onClick={() => handlePrevPage()}>
                        Previous
                    </a>
                </li>

                {
                    pages.map((page, index) => {
                        return (
                            <li key={`page-${index}`} className={page === currentPage ? 'page-item active' : 'page-item'}>
                                <a onClick={() => onPageChange(page)} className="page-link" >
                                    {page}
                                </a>
                            </li>
                        )
                    })
                }
                <li
                    className={currentPage === totalPages ? "page-item disabled" : "page-item"}

                >
                    <a className="page-link" onClick={() => handleNextPage()}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;