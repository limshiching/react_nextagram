import React from 'react';
import {
    Button,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';


const SignUp = props => {
    console.log(props.passwordValid)
    return (
        <>
            <Form onSubmit={e => props.handleSignUp(e)}>
                <FormGroup>
                    <Label for="signupUsername">Username</Label>
                    <Input type="username" name="username"
                        id="signupUsername"
                        placeholder="Insert Username"
                        onChange={e => {
                            if (props.delay) {
                                clearTimeout(this.state.delay);
                            }
                            props.handleUsername(e)
                        }} value={props.username}

                        {...(props.username.length >= 6
                            ? props.usernameValid
                                ? { valid: true }
                                : { invalid: true }
                            : props.username.length > 0
                                ? { invalid: true }
                                : "")}
                    />
                    <FormFeedback
                        {...(props.username.length > 0 && props.username.length >= 6
                            ? props.usernameValid
                                ? { valid: true }
                                : { invalid: true }
                            : { invalid: true })}
                    >
                        {props.username.length >= 6
                            ? props.usernameValid
                                ? "Sweet, this username is available!"
                                : "Sorry, this username is taken! :("
                            : "Must be minimum 6 characters"}
                    </FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="signupEmail">Email</Label>
                    <Input type="email" name="signupEmail" id="signupEmail" placeholder="Insert e-mail address"
                        onChange={e => props.handleInput(e)} value={props.signupEmail}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="signupPassword">Password</Label>
                    <Input type="password" name="signupPassword"
                        id="signupPassword"
                        placeholder="Please insert password that has more than 8 characters."
                        onChange={e => props.handlePassword(e)} value={props.signupPassword}

                        {...(props.signupPassword.length >= 8
                            ? props.passwordValid
                                ? { valid: true }
                                : { invalid: true }
                            : props.signupPassword.length > 0
                                ? { invalid: true }
                                : "")}
                    />

                    <FormFeedback
                        {...(props.signupPassword.length > 0 &&
                            props.passwordValid
                            ? { valid: true }
                            : { invalid: true })}
                    >
                        {props.passwordValid
                            ? "Nice, your password is strong enough!"
                            : "Please insert a strong password that has more than 8 characters"}
                    </FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input type="password" name="confirmPassword" id="confirmPassword"
                        placeholder="Please confirm your password."
                        onChange={e => props.handleInput(e)} value={props.confirmPassword} />
                </FormGroup>

                <Button className="m-2" color="primary" >Sign Up</Button>{' '}
                {/* <Button color="secondary" onClick={props.toggle}>Cancel</Button> */}
            </Form>
            <ModalFooter>
                <p>Already a member?<a href="#" onClick={props.toggleForm}> Log in here.</a></p>{' '}
                <Form className="signUp">
                    {/* <form onSubmit={props.handleSubmit}> */}
                    <FormGroup>
                        {/* <Label for="signupEmail">Email</Label> */}

                    </FormGroup>



                    {/* </form> */}
                </Form>
            </ModalFooter>

            {/* </Collapse> */}


        </>
    );
}


export default SignUp