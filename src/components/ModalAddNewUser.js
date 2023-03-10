import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { postCreateNewUser } from '../services/UserService';
import { toast } from 'react-toastify';
const ModalAddNewUser = (props) => {

    const { showModalAddUser, setShowModalAddUser, getAllUser } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const passRef = useRef()
    const userRef = useRef()

    const handleClose = () => {
        setShowModalAddUser(false)
    }

    const handleSubmitAddUser = async () => {
        setLoading(true)
        setTimeout(async () => {
            let data = await postCreateNewUser(email, password, username)
            if (data && data.errCode === 0) {
                handleClose();
                getAllUser();
                toast.success(data.message)
                setLoading(false)
            } else {
                toast.error('Create user faild')
            }
        }, 1500)
    }

    return (
        <Modal
            show={showModalAddUser}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>ADD NEW USER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onKeyUp={event => {
                                if (event.key === 'Enter') {
                                    passRef.current.focus();
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Passowrd</Form.Label>
                        <Form.Control
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="Password"
                            value={password}
                            ref={passRef}
                            onKeyUp={event => {
                                if (event.key === 'Enter') {
                                    userRef.current.focus();
                                }
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            onChange={(event) => setUsername(event.target.value)}
                            type="text"
                            placeholder="Username"
                            value={username}
                            ref={userRef}
                            onKeyUp={event => {
                                if (event.key === 'Enter') {
                                    handleSubmitAddUser()
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
                <Button variant="primary" onClick={() => handleSubmitAddUser()}>
                    {loading && <i className='fa-solid fa-circle-notch fa-spin'></i>} Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddNewUser;