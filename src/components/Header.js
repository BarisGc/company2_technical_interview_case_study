import React from 'react'
import { useSelector } from 'react-redux';

import { Badge, Col } from 'react-bootstrap'
function Header() {
    const users = useSelector((state) => state.userData.users);
    return (
        <Col md={{ span: 12, offset: 0 }} className='d-flex justify-content-center bg-dark text-white py-3 mb-0 mb-md-4'>
            <h1 className='text-center'>
                Users <Badge bg="danger">{users.length}</Badge>
            </h1>
        </Col>
    )
}

export default Header