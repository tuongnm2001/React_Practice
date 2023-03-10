import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { putEditUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {

    const { showModalEditUser, setShowModalEditUser, dataEditUser, getAllUser } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setEmail(dataEditUser.email)
        setPassword(dataEditUser.password)
        setUsername(dataEditUser.username)
    }, [dataEditUser])

    const handleClose = () => {
        setShowModalEditUser(false)
    }

    const handleEditUser = async () => {
        setLoading(true)
        setTimeout(async () => {
            let res = await putEditUser(email, username, dataEditUser.id);
            if (res && res.errCode === 0) {
                handleClose();
                getAllUser();
                toast.success(res.errMessage)
                setLoading(false)
            }
        }, 1500);

    }

    return (
        <Modal
            show={showModalEditUser}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>UPDATE USER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            onChange={(event) => setEmail(event.target.value)}
                            type="text"
                            placeholder="Email"
                            value={email}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="Job"
                            value={'******'}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            onChange={(event) => setUsername(event.target.value)}
                            type="text"
                            placeholder="Username"
                            value={username}
                            onKeyUp={event => {
                                if (event.key === 'Enter') {
                                    handleEditUser()
                                }
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    {loading && <i className='fa-solid fa-circle-notch fa-spin'></i>}  Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditUser;