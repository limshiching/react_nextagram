import React from 'react';
import axios from 'axios';
import {
    Card,
    CardImg,
} from 'reactstrap';

class UserImages extends React.Component {
    state = {
        userImages: [],
    };

    componentDidMount() {

        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${this.props.userId}`)
            .then(result => {
                // console.log(result)
                this.setState({
                    userImages: result.data
                });
            });

    }

    render() {
        return (
            <div className="card-columns"> {
                this.state.userImages.map((image, index) => {
                    return (
                        <Card key={index}>
                            <CardImg
                                src={image}
                                alt="Card-image-cap"
                            />
                        </Card>

                    );

                })
            }
            </div>
        )
    }
}

export default UserImages