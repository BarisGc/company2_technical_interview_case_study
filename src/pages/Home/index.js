import { Row } from 'react-bootstrap';
import UsersDataHeader from "../../components/usersData/UsersDataHeader";
import UsersOptionBar from "../../components/usersData/UsersOptionBar";
import UserDataTable from "../../components/usersData/UsersDataTable";

function Home() {

    return (
        <Row>
            <UsersDataHeader />
            <UsersOptionBar />
            <UserDataTable />
        </Row >
    );
}

export default Home