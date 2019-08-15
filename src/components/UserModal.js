import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import LogIn from './LogIn';
import SignUp from './SignUp';
import axios from 'axios';

class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLogin: false,
            loginEmail: '',
            loginPassword: '',
            username: '',
            usernameValid: false,
            passwordValid: false,
            signupEmail: '',
            signupPassword: '',
            confirmPassword: '',
        };
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleEmailInput = e => {
        this.setState({
            loginEmail: e.target.value
        })
    }

    handlePasswordInput = e => {
        this.setState({
            loginPassword: e.target.value
        })
    }

    handlePassword = e => {
        this.setState({
            signupPassword: e.target.value
        }, () => this.handlePasswordCheck());
    };

    handleUsername = e => { //FOR SIGN UP USERNAME//
        let x = { ...e };
        let delay = setTimeout(() => this.handleUsernameCheck(x), 300);
        this.setState({
            [e.target.name]: e.target.value,
            delay
        });
    };

    handleUsernameCheck = e => { //FOR SIGN UP//
        const newUsername = e.target.value;
        if (newUsername.length >= 6) {
            axios.get(
                `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
            ).then(response => {
                if (response.data.valid) {
                    this.setState({
                        usernameValid: true
                    });
                } else {
                    this.setState({
                        usernameValid: false
                    });
                }
            });
        }
    };

    handlePasswordCheck = () => { //FOR SIGN UP//
        const { signupPassword } = this.state;
        if (signupPassword.length >= 8) {
            this.setState({
                passwordValid: true
            });
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
        setTimeout(() => {
            this.setState({
                isLogin: true
            });
        }, 1000);
    };

    toggleForm = () => {
        this.setState({
            isLogin: !this.state.isLogin
        });
    };

    handleSubmitLogin = e => {
        e.preventDefault();
        const { loginEmail, loginPassword } = this.state;
        this.toggle();
        this.props.logInUser(loginEmail, loginPassword);
        console.log(loginEmail, loginPassword);
    };

    handleSignUp = e => {
        e.preventDefault();
        const { username, signupEmail, signupPassword, confirmPassword } = this.state;
        this.toggle();
        this.props.signUpUser(username, signupEmail, signupPassword, confirmPassword);
        console.log(username, signupEmail, signupPassword, confirmPassword);
    }

    render() {
        return (
            <>
                <div>
                    <Button color="warning" onClick={this.toggle}>Login Here
                </Button>
                    <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>{this.state.isLogin ? "Log In" : "Sign Up"}
                        </ModalHeader>
                        <ModalBody>
                            {this.state.isLogin ? (
                                <LogIn handleInput={this.handleInput}
                                    toggleModal={this.toggle}
                                    handleEmailInput={this.handleEmailInput}
                                    handlePasswordInput={this.handlePasswordInput}
                                    toggleForm={this.toggleForm}
                                    loginEmail={this.state.loginEmail}
                                    loginPassword={this.state.loginPassword}
                                    handleSubmitLogin={this.handleSubmitLogin}
                                />
                            ) : (
                                    <SignUp handleInput={this.handleInput}
                                        username={this.state.username} toggleForm={this.toggleForm}
                                        signupEmail={this.state.signupEmail}
                                        signupPassword={this.state.signupPassword}
                                        confirmPassword={this.state.confirmPassword}
                                        handleSignUp={this.handleSignUp}
                                        handleUsernameCheck={this.handleUsernameCheck}
                                        handleUsername={this.handleUsername}
                                        usernameValid={this.state.usernameValid}
                                        handlePassword={this.handlePassword}
                                        passwordValid={this.state.passwordValid}
                                    />
                                )}
                        </ModalBody>
                        {/* <ModalFooter>
                            <Button color="link" onClick={this.toggleForm}>{this.state.isLogin ? "Take me to Sign up" : "I want to Log In"}
                            </Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel
                            </Button>
                        </ModalFooter> */}
                    </Modal>
                </div>
            </>
        );
    }
}

export default UserModal;