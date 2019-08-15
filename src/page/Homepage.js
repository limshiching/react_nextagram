import React from 'react';
import {
    Container,
    Card,
    CardImg,
    CardBody,
} from "reactstrap";
import UserImages from '../containers/UserImages';
import { Link } from 'react-router-dom';
import '../App.css';

class Homepage extends React.Component {
    render() {
        return (

            <Container fluid className="Container">
                <div>
                    {
                        this.props.users.map((users, index) => {
                            return (
                                <Card className="mb-3" key={index}>
                                    <div className="row">
                                        <div className="col-3" >
                                            <CardImg
                                                className="w-100 d-flex rounded-circle p-3"
                                                src={users.profileImage}
                                                alt="Card image cap"
                                            />
                                            <Link to={`/users/${users.id}`} className="text-dark">
                                                {users.username}
                                            </Link>

                                        </div>
                                        <CardBody className="col-9">
                                            <UserImages userId={users.id} />
                                        </CardBody>
                                    </div>
                                </Card>
                            );
                        })
                    }
                </div>
            </Container >
        )

    }
}

export default Homepage;