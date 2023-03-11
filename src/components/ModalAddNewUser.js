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
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorUsername, setErrorUsername] = useState(false)
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
                setEmail('')
                setPassword('')
                setUsername('')
            } else if (data.errCode === 1) {
                toast.error(data.message)
                setErrorEmail(true)
                setLoading(false)
            } else if (data.errCode === 2) {
                toast.error(data.message)
                setErrorPassword(true)
                setLoading(false)
            } else if (data.errCode === 3) {
                toast.error(data.message)
                setErrorUsername(true)
                setLoading(false)
            } else if (data.errCode === -1) {
                toast.error(data.message)
                setErrorEmail(true)
                setLoading(false)
            } else {
                toast.error(data.message)
                setErrorPassword(true)
                setLoading(false)
            }
        }, 1500)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
        setErrorEmail(false)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
        setErrorPassword(false)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
        setErrorUsername(false)
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
            <Modal.Body >
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            isInvalid={errorEmail}
                            onChange={(event) => handleEmail(event)}
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
                            isInvalid={errorPassword}
                            onChange={(event) => handlePassword(event)}
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
                            isInvalid={errorUsername}
                            onChange={(event) => handleUsername(event)}
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