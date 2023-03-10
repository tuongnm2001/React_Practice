import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../services/UserService';
import _ from 'lodash'
import { useState } from 'react';


const ModalDelUser = (props) => {

    const { showModalDelUser, setShowModalDelUser, dataDelUser, getAllUser } = props
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        setShowModalDelUser(false)
    }

    const handleDeleteUser = async () => {
        setLoading(true)
        setTimeout(async () => {
            let res = await deleteUser(dataDelUser.id)
            if (res && res.errCode === 0) {
                handleClose()
                getAllUser();
                toast.success(res.message)
                setLoading(false)
            }
        }, 1500)
    }

    return (
        <Modal
            show={showModalDelUser}
            onHide={handleClose}
            backdrop='static'
        >
            <Modal.Header closeButton>
                <Modal.Title>DELET USER</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete user <span style={{ color: 'red' }}>{dataDelUser.email}</span></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser()}>
                    {loading && <i className='fa-solid fa-circle-notch fa-spin'></i>} Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelUser;