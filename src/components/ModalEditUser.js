import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { putEditUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {

    const { showModalEditUser, setShowModalEditUser, dataEditUser, handleEditUserFromModal } = props
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    useEffect(() => {
        setName(dataEditUser.first_name)
    }, [dataEditUser])

    const handleClose = () => {
        setShowModalEditUser(false)
    }

    const handleEditUser = async (page) => {
        let res = await putEditUser(page, name, job);
        if (res && res.updatedAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataEditUser.id
            })
        }
        toast.success('Update success')
        handleClose()

    }

    return (
        <Modal
            show={showModalEditUser}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>EDIT USER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            onChange={(event) => setName(event.target.value)}
                            type="text"
                            placeholder="Enter Name"
                            value={name || ''}
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
                <Button variant="primary" onClick={() => handleEditUser()}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditUser;