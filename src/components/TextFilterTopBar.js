import { useSelector, useDispatch, } from 'react-redux';
import { selectFilterOption, defineUserPageLimit } from '../redux/usersSlice'
import { InputGroup, Dropdown, DropdownButton, FormControl, Col, Row, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function TextFilterTopBar() {

    //General
    const dispatch = useDispatch();

    // Selectors
    const filterTypes = useSelector((state) => state.userData.filterTypes);
    const userPageLimit = useSelector((state) => state.userData.userPageLimit);

    // 1.group-----------------
    // Text Search & Filter
    const handleTextSearch = (e) => {
        dispatch(selectFilterOption(
            {
                ...filterTypes,
                searchName: e.target.value
            }))
    }

    // userStatus Filter
    const handleUserStatusFilter = (choice) => {
        dispatch(selectFilterOption(
            {
                ...filterTypes,
                userStatusFilter: choice
            }))
    }

    // Reset Filters
    const handleClearFilters = () => {
        dispatch(selectFilterOption(
            {
                searchName: '',
                userStatusFilter: '',
            }))
    }

    // Change User Page Limit
    const handleUserPageLimit = (value) => {
        dispatch(defineUserPageLimit(value))
    }

    return (
        <Row className='my-3 TextFilterTopBar' >
            <Col md={{ span: 12, offset: 0 }} className='' >
                <ButtonToolbar className="mb-3 justify-content-center ">
                    <InputGroup className='mx-auto  ms-md-0 me-md-2'>
                        <InputGroup.Text className='searchIcon pb-2' id="basic-addon1"><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                        <FormControl
                            placeholder=""
                            aria-label="SearchNotes"
                            aria-describedby="SearchNotesInput"
                            className='pb-2'
                            onChange={handleTextSearch} />

                        <FormControl
                            type="number"
                            className='text-center userPageLimit '
                            value={userPageLimit}
                            onChange={(e) => handleUserPageLimit(e.target.value)} />

                    </InputGroup>
                    <ButtonGroup className="mt-2 mt-md-0" aria-label="First group">
                        <DropdownButton as={ButtonGroup} title="Status Filter" id="bg-nested-dropdown" variant='primary' className=' ms-4 ms-md-0'>
                            <Dropdown.Item active={filterTypes.userStatusFilter === 'active' ? true : false} eventKey="1" onClick={() => handleUserStatusFilter('active')}>Active</Dropdown.Item>
                            <Dropdown.Item active={filterTypes.userStatusFilter === 'passive' ? true : false} eventKey='2' onClick={() => handleUserStatusFilter('passive')}>Passive</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="danger" onClick={handleClearFilters} className='clearButton'>
                            Clear All Filters
                        </Button>
                        <ReactHTMLTableToExcel
                            className='btn btn-info'
                            table='userDataTableAll'
                            filename='userDataTable Excel File'
                            sheet='Sheet'
                            buttonText='Export to Excel File' />
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>

        </Row >
    )
}

export default TextFilterTopBar