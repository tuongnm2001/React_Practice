import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelUser = (props) => {

    const { showModalDelUser, setShowModalDelUser, dataDelUser } = props

    const handleClose = () => {
        setShowModalDelUser(false)
    }

    const handleDeleteUser = () => {
        alert('s')
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