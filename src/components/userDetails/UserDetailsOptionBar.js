import { useSelector, useDispatch, } from 'react-redux';
import { useState } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'

import { changeUserName, changeUserDetails, assignNewCourseToUser } from '../../redux/usersSlice'

import { Col, Button, ButtonToolbar, ButtonGroup, Modal, Form, Offcanvas } from 'react-bootstrap'

import { Formik } from 'formik';
import * as yup from "yup";

function UserDetailsOptionBar() {

    //General
    const dispatch = useDispatch();

    const users = useSelector((state) => state.userData.users);
    const usersDetail = useSelector((state) => state.userData.users_detail);



    const { userID } = useParams()

    const findUserName = users.find((user) => (user.id == Number(userID)))
    const findUserDetail = usersDetail.find((user) => user.user_id == Number(userID))

    // Edit User Info MODAL & Formik & Yup
    const [editUserModalShow, setEditUserModalShow] = useState(false);



    const handleEditUserModalClose = () => {
        setEditUserModalShow(false)
    }
    const handleEditUserModalShow = () => setEditUserModalShow(true);

    // Schema for yup
    const validationSchema1 = yup.object().shape({
        userName: yup.string()
            .min(2, "*User Name must have at least 2 characters")
            .max(100, "*User Name can't be longer than 20 characters")
            .required("*User Name is required"),
        age: yup.string()
            .required("*Age is required"),
        job: yup.string()
            .min(2, "*Job must have at least 2 characters")
            .max(100, "*Job can't be longer than 30 characters")
            .required("*Job is required"),
    });

    // Add New Course  offCanvas & Formik & Yup
    const [addNewCourseoffCanvas, setAddNewCourseoffCanvas] = useState(false);
    const handleClose = () => {
        setAddNewCourseoffCanvas(false);

    }
    const toggleNewCourseoffCanvasShow = () => setAddNewCourseoffCanvas((s) => !s);

    // Schema for yup
    const validationSchema2 = yup.object().shape({
        course_name: yup.string()
            .min(2, "*Course Name must have at least 2 characters")
            .max(100, "*Course Name can't be longer than 20 characters")
            .required("*Course Name is required"),
        measured_at: yup.string()
            .required("*measured_at is required"),
        completed_at: yup.string()
            .required("*completed_at is required"),
    });

    if (!findUserName) {
        return <Redirect to="/" />
    }
    return (
        <>
            <Col md={{ span: 12, offset: 0 }} className='py-3 bg-dark' >
                <ButtonToolbar className="justify-content-center ">
                    <ButtonGroup className="" aria-label="First group">
                        <Link className="btn btn-primary" to="/" >Home</Link>
                        <Button variant='warning' onClick={() => handleEditUserModalShow()}>
                            Edit User Info
                        </Button>
                        <Button variant="success" onClick={() => toggleNewCourseoffCanvasShow()}>
                            Add New Course
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>

            {/* // MODAL: Update User Info */}
            <Formik
                initialValues={{ userName: findUserName.name, age: findUserDetail.age, job: findUserDetail.job }}
                validationSchema={validationSchema1}
                onSubmit={(values, { setSubmitting }) => {
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    if (values.userName == findUserName.name && values.age == findUserDetail.age &&
                        values.job == findUserDetail.job) {
                        alert("No Changes!");
                        setSubmitting(false);
                    } else {
                        dispatch(changeUserName({
                            userID: userID,
                            name: values.userName
                        }))
                        dispatch(changeUserDetails({
                            userID: userID,
                            age: values.age,
                            job: values.job
                        }))
                        setSubmitting(true);

                        // Simulate submitting to database, shows us values submitted
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 500);
                    }
                }}
            >
                {/* Callback function containing Formik state and helpers that handle common form actions */}
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting }) => (
                    <Modal
                        show={editUserModalShow}
                        onHide={handleEditUserModalClose}
                        backdrop="static"
                        keyboard={false}
                        fullscreen={'md-down'}
                    >
                        <Form onSubmit={handleSubmit} className="">
                            {console.log(values)}
                            <Modal.Header closeButton className='bg-dark text-white'
                                closeVariant={'white'}
                            >
                                <Modal.Title>Edit Note</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='bg-dark text-white  '>
                                <Form.Group controlId="formName">
                                    <Form.Label>User Name :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        /* This userName property is used to access the value of the form element via values.nameOfElement */
                                        name="userName"
                                        placeholder="User Name"
                                        /* Set onChange to handleChange */
                                        onChange={handleChange}
                                        /* Set onBlur to handleBlur */
                                        onBlur={handleBlur}
                                        /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                        value={values.userName}
                                        /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
                                        className={touched.userName && errors.userName ? "error" : null}
                                    />
                                    {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
                                    {touched.userName && errors.userName ? (
                                        <div className="error-message">{errors.userName}</div>
                                    ) : null}
                                </Form.Group>
                                <Form.Group controlId="age">
                                    <Form.Label>Age :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="age"
                                        placeholder="Age"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.age}
                                        className={touched.age && errors.age ? "error" : null}
                                    />
                                    {touched.age && errors.age ? (
                                        <div className="error-message">{errors.age}</div>
                                    ) : null}
                                </Form.Group>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Job :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="job"
                                        placeholder="Job"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.job}
                                        className={touched.job && errors.job ? "error" : null}
                                    />
                                    {touched.job && errors.job ? (
                                        <div className="error-message">{errors.job}</div>
                                    ) : null}
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer className='bg-dark text-white'>
                                <Form.Group>
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                        Update User Info
                                    </Button>
                                </Form.Group>
                            </Modal.Footer>
                        </Form>
                    </Modal>)}
            </Formik>

            {/* OffCanvas: Add New Course */}
            <Formik
                initialValues={{ course_name: "", measured_at: "", completed_at: "" }}
                validationSchema={validationSchema2}
                onSubmit={(values, { setSubmitting }) => {
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    dispatch(assignNewCourseToUser({
                        userID: userID,
                        course_name: values.course_name,
                        measured_at: values.measured_at,
                        completed_at: values.completed_at,
                    }))
                    setSubmitting(true);

                    // Simulate submitting to database, shows us values submitted, resets form
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                {/* Callback function containing Formik state and helpers that handle common form actions */}
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting }) => (
                    <Offcanvas className='h-75  bg-dark text-white addCourseOffCanvas' show={addNewCourseoffCanvas} onHide={handleClose} scroll={true} backdrop={true} placement={'top'}>
                        <Offcanvas.Header closeButton className=' btn-close-white me-3 pb-0'>
                            <Offcanvas.Title className='mx-auto'>Add Course</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className=''>
                            <Form onSubmit={handleSubmit} className="">
                                {console.log(values)}
                                <Form.Group className='w-50 mx-auto' controlId="course_name">
                                    <Form.Label>Course Name :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        /* This course_name property is used to access the value of the form element via values.nameOfElement */
                                        name="course_name"
                                        placeholder="Course Name"
                                        /* Set onChange to handleChange */
                                        onChange={handleChange}
                                        /* Set onBlur to handleBlur */
                                        onBlur={handleBlur}
                                        /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                        value={values.course_name}
                                        /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
                                        className={touched.course_name && errors.course_name ? "error" : null}
                                    />
                                    {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
                                    {touched.course_name && errors.course_name ? (
                                        <div className="error-message py-1">{errors.course_name}</div>
                                    ) : null}
                                </Form.Group>
                                <Form.Group className='w-50 mx-auto' controlId="measured_at">
                                    <Form.Label>Measured_At :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="measured_at"
                                        placeholder="Measured_At"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.measured_at}
                                        className={touched.measured_at && errors.measured_at ? "error py-2" : null}
                                    />
                                    {touched.measured_at && errors.measured_at ? (
                                        <div className="error-message py-1">{errors.measured_at}</div>
                                    ) : null}
                                </Form.Group>
                                <Form.Group className='w-50 mx-auto' controlId="completed_at">
                                    <Form.Label>Completed_At :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="completed_at"
                                        placeholder="Completed_At"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.completed_at}
                                        className={touched.completed_at && errors.completed_at ? "error py-2" : null}
                                    />
                                    {touched.completed_at && errors.completed_at ? (
                                        <div className="error-message py-1">{errors.completed_at}</div>
                                    ) : null}
                                </Form.Group>
                                <Form.Group className='pt-1 d-flex justify-content-center'>
                                    <Button variant="secondary" className='' type="submit" disabled={isSubmitting}>
                                        Save New Course
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Offcanvas.Body>
                    </Offcanvas>)}
            </Formik>
        </>
    )
}

export default UserDetailsOptionBar