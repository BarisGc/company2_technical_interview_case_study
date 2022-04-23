// import './styles.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from './Loading';
import Error from './Error';

import { fetchUsers } from "../redux/usersSlice";
import { changeUsersPage, updateTableData } from '../redux/usersSlice'

import { Pagination, Col, Table } from 'react-bootstrap';





function UserDataTable() {
    // Global States & Selectors
    const dispatch = useDispatch();
    const userPageLimit = useSelector((state) => state.userData.userPageLimit);
    const userPageOffset = useSelector((state) => state.userData.userPageOffset);
    const users = useSelector((state) => state.userData.users);
    const usersDetail = useSelector((state) => state.userData.Users_detail);
    const courses = useSelector((state) => state.userData.Courses);
    const currentPage = useSelector((state) => state.userData.currentPage);
    const status = useSelector((state) => state.userData.status);
    const error = useSelector((state) => state.userData.error);
    const filterTypes = useSelector((state) => state.userData.filterTypes);
    const tableData = useSelector((state) => state.userData.tableData);
    //Local States
    const [activePage, setActivePage] = useState(currentPage)

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])

    // Pagination Calculations
    const calculatedPages = []
    console.log('users', users)
    console.log('usersDetail', usersDetail)
    console.log('courses', courses)
    console.log('tableData', tableData)
    if (userPageLimit > 0) {
        for (let pageNumber = 1; pageNumber < (Math.ceil(users.length / userPageLimit) + 1); pageNumber++) {
            calculatedPages.push(
                <Pagination.Item key={pageNumber} active={activePage === pageNumber ? true : false} onClick={() => handlePagination(pageNumber)}>
                    {pageNumber}
                </Pagination.Item>)
        }
    }

    // handlePagination
    const handlePagination = ((pageNumber) => {
        dispatch(changeUsersPage(pageNumber))
        setActivePage(pageNumber)
    })

    // Paginated & Filtered Users
    useEffect(() => {
        const filteredUsers = () => {
            if (filterTypes.searchName === '' && filterTypes.userStatusFilter === '') {
                return users
            } else if (filterTypes.searchName !== '' && filterTypes.userStatusFilter === '') {
                return users.filter((user) =>
                    (user.name.toLowerCase().includes(filterTypes.searchName)))
            } else if (filterTypes.searchName === '' && filterTypes.userStatusFilter !== '') {
                return users.filter((user) => (user.status === filterTypes.userStatusFilter))
            } else if (filterTypes.searchName !== '' && filterTypes.userStatusFilter !== '') {
                return users.filter((user) =>
                    ((user.name.toLowerCase().includes(filterTypes.searchName))) && (user.status === filterTypes.userStatusFilter))
            }
        }
        let newTableData = filteredUsers().filter((user, index) => {
            return ((index >= Number(userPageOffset)) && (index < (Number(userPageLimit) + Number(userPageOffset))))
        })
        dispatch(updateTableData(newTableData))
    }, [dispatch, userPageLimit, userPageOffset, users, filterTypes.searchName, filterTypes.userStatusFilter])

    if (status === 'failed') {
        return <Error message={error} />
    }

    return (
        <>
            <Col md={{ span: 10, offset: 1 }}>
                {/* {isLoading &&} */}
                {status === 'loading' && <div xs={12} className='d-flex justify-content-center'><Loading /></div>}
                {status === 'succeeded' &&
                    // Display Users
                    <Table striped bordered hover size="sm" className="datatable" id='userDataTable'>
                        <thead >
                            <tr>
                                <th className="text-center align-middle fs-6">User ID</th>
                                <th className="text-center align-middle fs-6">User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }
                {status === 'succeeded' &&
                    //Pagination Buttons
                    <Pagination size="sm">
                        {calculatedPages}
                    </Pagination>
                }

            </Col>
        </>
    );
}

export default UserDataTable