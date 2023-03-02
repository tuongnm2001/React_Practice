import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import ModalAddNewUser from './components/ModalAddNewUser';
import TableUsers from './components/TableUsers';
import { ToastContainer } from 'react-toastify';
import { fetchAllUser } from './services/UserService';
import ModalEditUser from './components/ModalEditUser';

function App() {

  const [showModalAddUser, setShowModalAddUser] = useState(false)
  const [showModalEditUser, setShowModalEditUser] = useState(false)
  const [listUser, setListUser] = useState([])
  const [totalUsers, setTotalUser] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [dataEditUser, setDataEditUser] = useState({})

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

  const handleAddNewUser = () => {
    setShowModalAddUser(true)
  }

  const handleSubmitUser = (user) => {
    setListUser([user, ...listUser])
    console.log('check user : ', user);
  }

  const handleShowModalEditUser = (user) => {
    setShowModalEditUser(true)
    setDataEditUser(user);
  }

  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <button
            className='my-3 btn-add btn btn-success'
            onClick={() => handleAddNewUser()}
          >
            Add New User
          </button>
          <TableUsers
            getAllUser={getAllUser}
            listUser={listUser}
            totalPages={totalPages}
            handleShowModalEditUser={handleShowModalEditUser}
          />
        </Container>


        <ModalAddNewUser
          showModalAddUser={showModalAddUser}
          setShowModalAddUser={setShowModalAddUser}
          getAllUser={getAllUser}
          handleSubmitUser={handleSubmitUser}
        />

        <ModalEditUser
          showModalEditUser={showModalEditUser}
          setShowModalEditUser={setShowModalEditUser}
          dataEditUser={dataEditUser}
        />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>

  );
}

export default App;
