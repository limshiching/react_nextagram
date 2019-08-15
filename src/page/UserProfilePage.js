import React from 'react';
import axios from 'axios';
import UserImages from '../containers/UserImages'
import Loading from '../components/Loading'
import '../App.css'
import {
    CardBody,
} from 'reactstrap';

class UserProfilePage extends React.Component {
    state = {
        user: [],
        loading: true,
    };

    componentDidMount() {
        console.log(this.props)
        axios.get(`https://insta.nextacademy.com/api/v1/users/${this.props.match.params.id}`)
            .then(result => {
                this.setState({
                    user: result.data,
                    loading: false
                })
                // console.log(result)
            })
    }


    render() {
        const { user, loading } = this.state
        return (
            <>
                <Loading loading={loading} />
                <CardBody><h3 className="p-2">{user.username}'s Profile</h3>
                    <img className="UserPictures" src={user.profileImage} alt={user.id} />
                    <h3 className="p-2">{user.username}'s Pictures</h3>
                    <UserImages userId={this.props.match.params.id} />
                </CardBody>

            </>
        )
    }

}

export default UserProfilePage