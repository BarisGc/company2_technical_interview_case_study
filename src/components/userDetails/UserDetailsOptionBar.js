import { useSelector, useDispatch, } from 'react-redux';
import { useState } from 'react'
import { selectFilterOption, defineUserPageLimit } from '../../redux/usersSlice'
import { InputGroup, Dropdown, DropdownButton, FormControl, Col, Row, Button, ButtonToolbar, ButtonGroup, Modal, Form } from 'react-bootstrap'
import { useFormik } from 'formik';

function UserDetailsOptionBar() {

    //General
    const dispatch = useDispatch();

    // Edit User Info MODAL
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    // Edit User Info MODAL & Formik
    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            userName: '',
            userAge: '',
            userJob: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
            <Col md={{ span: 12, offset: 0 }} className='py-3 bg-dark' >
                <ButtonToolbar className="justify-content-center ">
                    <ButtonGroup className="" aria-label="First group">
                        <Button variant='warning' onClick={() => handleShow()}>
                            Edit User Info
                        </Button>
                        <Button variant="success" >
                            Add New Course
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                fullscreen={'md-down'}
            >
                <Modal.Header closeButton className='bg-dark text-white'
                    closeVariant={'white'}
                >
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-white  '>
                    <Form>
                        <Form.Group className="mb-3" >
                            {/* <Form.Label>Title</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="Enter Your Title Here..."
                                name='title' onChange={handleInputChange} value={values.title} /> */}

                        </Form.Group>
                        <Form.Group className="mb-3" >
                            {/* <Form.Label>Content</Form.Label>
                            <Form.Control size="sm" as="textarea" rows={5} placeholder='Enter Your Note Here...' name='content' onChange={handleInputChange} value={values.content} /> */}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='bg-dark text-white'>
                    <Form>
                        <Form.Group>
                            <Button variant="secondary" id="button-addon1"
                                onClick={handleSubmit}
                            >
                                Update Note
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserDetailsOptionBar