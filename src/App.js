import { useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import ModalAddNewUser from './components/ModalAddNewUser';
import TableUsers from './components/TableUsers';

function App() {

  const [showModalAddUser, setShowModalAddUser] = useState(false)

  const handleAddNewUser = () => {
    setShowModalAddUser(true)
  }

  return (
    <div className='app-container'>
      <Header />
      <Container>
        <button
          className='my-3 btn-add btn btn-success'
          onClick={() => handleAddNewUser()}
        >
          Add New User
        </button>
        <TableUsers />
      </Container>


      <ModalAddNewUser
        showModalAddUser={showModalAddUser}
        setShowModalAddUser={setShowModalAddUser}
      />
    </div>

  );
}

export default App;
