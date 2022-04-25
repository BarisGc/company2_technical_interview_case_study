import { Row } from 'react-bootstrap';
import UserDetailsHeader from "../../components/userDetails/UserDetailsHeader";
import UserDetailsOptionBar from "../../components/userDetails/UserDetailsOptionBar";
import UserDetailsTable from "../../components/userDetails/UserDetailsTable";

function Home() {

    return (
        <Row>
            <UserDetailsHeader />
            <UserDetailsOptionBar />
            <UserDetailsTable />
        </Row >
    );
}

export default Home