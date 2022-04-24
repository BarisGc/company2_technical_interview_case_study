// import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import Header from "../../components/usersData/Header";
import TextFilterTopBar from "../../components/usersData/TextFilterTopBar";
import UserDataTable from "../../components/usersData/UserDataTable";


function Home() {

    return (
        <Row>
            <Header />
            <TextFilterTopBar />
            <UserDataTable />
        </Row >
    );
}

export default Home