import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ModalAddNewUser = (props) => {

    const { showModalAddUser, setShowModalAddUser } = props
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleClose = () => {
        setShowModalAddUser(false)
    }

    const handleSubmitAddUser = () => {
        console.log('name : ', name, 'job : ', job);
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
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Job</Form.Label>
                        <Form.Control
                            onChange={(event) => setJob(event.target.value)}
                            type="text"
                            placeholder="Job"
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