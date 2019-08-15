import React from 'react';
import {
    Form,
    FormGroup,
    Input,
    FormText,
    Button,
}
    from 'reactstrap';
import axios from 'axios';

class UploadPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageFile: '',
            previewImage: '',
            message: '',
            uploadSuccess: false,
        }
    }

    handleFile = e => {
        this.setState({
            previewImage: URL.createObjectURL(e.target.files[0]),
            imageFile: e.target.files[0]
        });
    };

    handleSubmitFile = e => {
        e.preventDefault();
        let JWT = JSON.parse(localStorage.getItem("JWT"));
        let formData = new FormData();
        formData.append("image", this.state.imageFile);

        axios.post(`https://insta.nextacademy.com/api/v1/images/`, formData,
            {
                headers: { Authorization: `Bearer ${JWT.auth_token}` }
            })
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        message: "Image Uploaded Successfully!",
                        previewImage: null,
                        imageFile: null,
                        uploadSuccess: true
                    });
                }
            })
            .catch(error => {
                console.log(error.response);
            });
    };

    render() {
        const { previewImage, message } = this.state;

        return (

            <>
                <div className="card">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            style={StyleSheet.centerBox}
                            width="50%"
                            height="50%"
                        />
                    ) : (
                            <h3 style={StyleSheet.centerBox} className="text-center">
                                {message ? message : "Live Preview"}
                            </h3>
                        )}

                </div>

                <Form onSubmit={this.handleSubmitFile}>


                    <FormGroup>
                        <Input
                            type="file"
                            name="image-file"
                            onChange={this.handleFile}
                        />
                        <FormText color="muted">
                        </FormText>
                    </FormGroup>
                    <Button type="submit" color="primary">
                        Upload
            </Button>
                </Form>


            </>

        )
    }



}

export default UploadPage;