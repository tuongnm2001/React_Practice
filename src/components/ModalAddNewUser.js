import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { postCreateNewUser } from '../services/UserService';
import { toast } from 'react-toastify';
const ModalAddNewUser = (props) => {

    const { showModalAddUser, setShowModalAddUser, getAllUser, handleSubmitUser } = props
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleClose = () => {
        setShowModalAddUser(false)
    }

    const handleSubmitAddUser = async () => {
        let data = await postCreateNewUser(name, job)
        if (data && data.id) {
            handleClose();
            setName('')
            setJob('')
            toast.success('Create user success')
            handleSubmitUser({ first_name: name, id: data.id })
        } else {
            toast.error('Create user faild')
        }
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
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            onChange={(event) => setName(event.target.value)}
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Job</Form.Label>
                        <Form.Control
                            onChange={(event) => setJob(event.target.value)}
                            type="text"
                            placeholder="Job"
                            value={job}

                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmitAddUser()}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddNewUser;