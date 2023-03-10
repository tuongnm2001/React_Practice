import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { ToastContainer } from 'react-toastify';
import _ from 'lodash'
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import { UserContext } from './context/UserContext';
import PrivateRoutes from './routes/PrivateRoutes';
import NotFound from './components/NotFound';

const App = () => {

  const { user, loginContext } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('email')) {
      loginContext(localStorage.getItem('email'))
    }
  }, [])

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
                <TableUsers />
              </PrivateRoutes>
            }>
            </Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </Container>
      </div >

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
