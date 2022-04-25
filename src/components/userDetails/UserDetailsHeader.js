import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom'

import { Badge, Col } from 'react-bootstrap'
function Header() {
    const users = useSelector((state) => state.userData.users);
    const usersDetail = useSelector((state) => state.userData.users_detail);

    const { userID } = useParams()

    const findUserName = users.find((user) => (user.id == Number(userID)))
    const findUserDetail = usersDetail.find((user) => user.user_id == Number(userID))

    if (!findUserName) {
        return <Redirect to="/" />
    }
    return (
        <Col md={{ span: 12, offset: 0 }} className='d-flex justify-content-center bg-dark text-white py-3'>
            <h1 className='text-center'>
                User :
                {' '}<Badge bg="danger">{findUserName.name}</Badge>{' '}
                <Badge bg="light" text="dark">{findUserDetail.age}</Badge>{' '}
                <Badge bg="secondary">{findUserDetail.job}</Badge>
            </h1>
        </Col>
    )
}

export default Header