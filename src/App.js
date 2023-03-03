import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import ModalAddNewUser from './components/ModalAddNewUser';
import TableUsers from './components/TableUsers';
import { toast, ToastContainer } from 'react-toastify';
import { fetchAllUser } from './services/UserService';
import ModalEditUser from './components/ModalEditUser';
import _ from 'lodash'
import ModalDelUser from './components/ModalDelUser';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse';

const App = () => {

  const [showModalAddUser, setShowModalAddUser] = useState(false)
  const [showModalEditUser, setShowModalEditUser] = useState(false)
  const [showModalDelUser, setShowModalDelUser] = useState(false)
  const [listUser, setListUser] = useState([])
  const [totalUsers, setTotalUser] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [dataEditUser, setDataEditUser] = useState({})
  const [dataDelUser, setDataDelUser] = useState({})
  const [dataExport, setDataExport] = useState([])

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

  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
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

          <TableUsers
            getAllUser={getAllUser}
            listUser={listUser}
            setListUser={setListUser}
            totalPages={totalPages}
            handleShowModalEditUser={handleShowModalEditUser}
            handleShowDelUser={handleShowDelUser}
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
          handleEditUserFromModal={handleEditUserFromModal}
        />

        <ModalDelUser
          showModalDelUser={showModalDelUser}
          setShowModalDelUser={setShowModalDelUser}
          dataDelUser={dataDelUser}
          handleDeleteUserFromModal={handleDeleteUserFromModal}

        />

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
