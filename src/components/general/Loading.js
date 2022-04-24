import React from 'react'
import { Spinner, Col } from 'react-bootstrap'
function Loading() {
    return (
        <Col >
            <span className='me-2'>Please Wait</span>
            <Spinner animation="border" size="sm" />
            <Spinner animation="border" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
            <span className='ms-2'>Refresh If Users' Informations Are Not Displayed</span>
        </Col>
    )
}

export default Loading