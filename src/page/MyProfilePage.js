import React from 'react';
import axios from 'axios';
import {
    Container,
    CardBody,
    Card,
    CardImg,
} from 'reactstrap';
import UserImages from '../containers/UserImages';
import UserProfilePage from '../page/UserProfilePage';

class MyProfilePage extends React.Component {
    state = {
        user: [],
        myImages: [],
        loading: true
    };

    componentDidMount() {

        let JWT = JSON.parse(localStorage.getItem("JWT"));

        axios({
            method: "GET",
            url: `https://insta.nextacademy.com/api/v1/images/me`,
            headers: {
                Authorization: `Bearer ${JWT.auth_token}`
            }
        }).then(result => {
            console.log(result);
            this.setState({
                myImages: result.data,
                loading: false,
            });
        }).catch(error => {
            console.log(error.response)
        });
    };


    render() {

        const me = JSON.parse(localStorage.getItem("JWT"))
        const { users } = this.props
        console.log(users)
        const user = users.find((user) => (
            user.id == me.user.id
        ))
        return (


            < Container fluid className="Container" >
                <CardBody className>
                    {user ? <>
                        <h3 className="p-2">{user.username}'s Profile</h3>

                        <img className="UserPictures" src={user.profileImage} alt={user.id} />
                        <h3 className="p-2">{user.username}'s Pictures</h3>
                    </>
                        : null}

                    <div className="card-columns" >

                        {this.state.myImages.map((imageFile, index) => {
                            console.log(imageFile)
                            return (
                                <Card key={index}>
                                    <CardImg
                                        img src={imageFile}
                                    />
                                </Card>
                            )
                        })}
                    </div>

                </CardBody>
            </Container >
        );
    }
}

export default MyProfilePage;






