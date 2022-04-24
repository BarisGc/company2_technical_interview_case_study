import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { useParams, Redirect } from 'react-router-dom'

import { Pagination, Col, Table, Button } from 'react-bootstrap';

import Loading from '../general/Loading';
import Error from '../general/Error';

import moment from 'moment';

function UserDetailsTable() {
    const { userID } = useParams()

    const courses = useSelector((state) => state.userData.courses);
    const status = useSelector((state) => state.userData.status);
    const error = useSelector((state) => state.userData.error);


    const userCourses = courses.find((element) => element.user_id == Number(userID)).courses

    console.log("courses", courses)
    console.log("userCourses", userCourses)
    if (!userID) {
        return <Redirect to="/" />
    }

    return (
        <Col md={{ span: 6, offset: 3 }} className='mt-3'>
            {/* {isLoading &&} */}
            {status === 'loading' && <div xs={12} className='d-flex justify-content-center'><Loading /></div>}
            {status === 'succeeded' &&
                // Display Users
                <Table striped bordered hover size="sm" variant="dark" className="datatable" id='userDetailsDataTable'>
                    <thead >
                        <tr>
                            <th className="text-center align-middle fs-6">Course Name</th>
                            <th className="text-center align-middle fs-6">Course Measured_At</th>
                            <th className="text-center align-middle fs-6">Course completed_At</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr >
                            <td className="text-center ">{userCourses.course_name}</td>
                            <td className="text-center">{moment.utc(userCourses.measured_at).format('HH:mm:ss')}</td>
                            <td className="text-center">{userCourses.completed_at}</td>
                        </tr>

                    </tbody>
                </Table>
            }
        </Col>
    )
}

export default UserDetailsTable