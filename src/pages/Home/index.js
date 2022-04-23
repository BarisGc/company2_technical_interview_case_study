import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import Header from "../../components/Header";
import TextFilterTopBar from "../../components/TextFilterTopBar";
import UserDataTable from "../../components/UserDataTable";


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