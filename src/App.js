import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { ToastContainer } from 'react-toastify';
import { fetchAllUser } from './services/UserService';
import ModalEditUser from './components/ModalEditUser';
import _ from 'lodash'
import ModalDelUser from './components/ModalDelUser';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import { UserContext } from './context/UserContext';
import PrivateRoutes from './routes/PrivateRoutes';
import NotFound from './components/NotFound';

const App = () => {

  const [showModalEditUser, setShowModalEditUser] = useState(false)
  const [showModalDelUser, setShowModalDelUser] = useState(false)
  const [listUser, setListUser] = useState([])
  const [totalUsers, setTotalUser] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [dataEditUser, setDataEditUser] = useState({})
  const [dataDelUser, setDataDelUser] = useState({})

  const { user, loginContext } = useContext(UserContext)
  console.log('check user : ', user);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'))
    }
  }, [])

  useEffect(() => {
    getAllUser(1);
  }, [])

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

  const handleShowModalEditUser = (user) => {
    setShowModalEditUser(true)
    setDataEditUser(user);
  }

  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex(item => item.id === user.id)
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser)
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


  return (
    <>


      <div className='app-container'>
        <Header />
        <Container>
          <Routes>

            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/users' element={
              <PrivateRoutes>
                <TableUsers getAllUser={getAllUser}
                  listUser={listUser}
                  setListUser={setListUser}
                  totalPages={totalPages}
                  handleShowModalEditUser={handleShowModalEditUser}
                  handleShowDelUser={handleShowDelUser} />
              </PrivateRoutes>
            }>
            </Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </Container>
      </div >

      <ModalEditUser
        showModalEditUser={showModalEditUser}
        setShowModalEditUser={setShowModalEditUser}
        dataEditUser={dataEditUser}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalDelUser
        showModalDelUser={showModalDelUser}
        setShowModalDelUser={setShowModalDelUser}
        dataDelUser={dataDelUser}
        handleDeleteUserFromModal={handleDeleteUserFromModal}

      />

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
