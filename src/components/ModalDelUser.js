import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../services/UserService';
import _ from 'lodash'

const ModalDelUser = (props) => {

    const { showModalDelUser, setShowModalDelUser, dataDelUser, handleDeleteUserFromModal } = props

    const handleClose = () => {
        setShowModalDelUser(false)
    }

    const handleDeleteUser = async (id) => {
        let res = await deleteUser(id)
        if (res && res.statusCode === 204) {
            toast.success('Delete user success')
            handleClose()
            handleDeleteUserFromModal(dataDelUser)
        }
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
                <Button variant="primary" onClick={() => handleDeleteUser()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelUser;