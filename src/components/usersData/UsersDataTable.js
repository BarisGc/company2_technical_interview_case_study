import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../general/Loading';

import { fetchUsers } from "../../redux/usersSlice";
import { changeUsersPage, updateTableData } from '../../redux/usersSlice'

import { Pagination, Col, Table, Button } from 'react-bootstrap';
import moment from 'moment';

function UserDataTable() {
    // Global States & Selectors
    const dispatch = useDispatch();
    const userPageLimit = useSelector((state) => state.userData.userPageLimit);
    const userPageOffset = useSelector((state) => state.userData.userPageOffset);
    const users = useSelector((state) => state.userData.users);
    const usersDetail = useSelector((state) => state.userData.users_detail);
    const courses = useSelector((state) => state.userData.courses);
    const currentPage = useSelector((state) => state.userData.currentPage);
    const status = useSelector((state) => state.userData.status);
    const error = useSelector((state) => state.userData.error);
    const filterTypes = useSelector((state) => state.userData.filterTypes);
    const tableData = useSelector((state) => state.userData.tableData);

    //Local States
    const [activePage, setActivePage] = useState(currentPage)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [dispatch, status])

    // Pagination Calculations
    const calculatedPages = []
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

    // Merging & Formatting Data for Data Export(Excel File)
    let mergedTableData = tableData.map((user) => {
        return {
            data1: user,
            data2: usersDetail.find((userDetail) => (userDetail.user_id == user.id)),
            data3: courses.find((course) => (course.user_id == user.id)),
        }
    })

    return (
        <>
            <Col md={{ span: 4, offset: 4 }}>
                {/* {isLoading &&} */}
                {status === 'loading' && <div xs={12} className='d-flex justify-content-center'><Loading /></div>}
                {status === 'succeeded' &&
                    // Display Users
                    <Table striped bordered hover size="sm" className="datatable" id='userDataTable'>
                        <thead >
                            <tr>
                                <th className="text-center align-middle fs-6">User ID</th>
                                <th className="text-center align-middle fs-6">User Name</th>
                                <th className="text-center align-middle fs-6">User Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((user, index) => (

                                <tr key={user.id} className=''>
                                    <td className="text-center ">{user.id}</td>
                                    <td className="text-center">{user.name}</td>
                                    <td className="text-center align-middle"><Link to={`/user/${user.id}`} >Details</Link></td>
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

            {/* This display-block-none table will be exported as excel file */}
            <Col md={{ span: 10, offset: 1 }} className='d-none'>
                {status === 'succeeded' &&
                    // Display Users
                    <Table striped bordered hover size="sm" className="datatable" id='userDataTableAll'>
                        <thead >
                            <tr>
                                <th className="text-center align-middle fs-6">User ID</th>
                                <th className="text-center align-middle fs-6">User Name</th>
                                <th className="text-center align-middle fs-6">User Status</th>
                                <th className="text-center align-middle fs-6">User Age</th>
                                <th className="text-center align-middle fs-6">User Job</th>
                                <th className="text-center align-middle fs-6">Course Name</th>
                                <th className="text-center align-middle fs-6">Measured At</th>
                                <th className="text-center align-middle fs-6">Completed At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mergedTableData.map((allData, index) => (
                                <tr key={allData.data1.id}>
                                    <td className="text-end">{allData.data1.id}</td>
                                    <td>{allData.data1.name}</td>
                                    <td>{allData.data1.status}</td>
                                    <td className="text-end">{allData.data2.age}</td>
                                    <td>{allData.data2.job}</td>
                                    <td>{allData.data3.courses.course_name}</td>
                                    <td className="text-end">{moment.utc(allData.data3.courses.measured_at).format('HH:mm:ss')}</td>
                                    <td className="text-end">{allData.data3.courses.completed_at}</td>
                                    <td><Button variant="info">Info</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }
            </Col>
        </>
    );
}

export default UserDataTable