import React from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';


const LogIn = props => {
    return (
        <>
            <Form onSubmit={e => props.handleSubmitLogin(e)}>
                <FormGroup>
                    <Label for="loginEmail">Email
                    </Label>
                    <Input
                        type="email"
                        name="loginEmail"
                        id="loginEmail"
                        placeholder="email adress"
                        onChange={props.handleEmailInput}
                        value={props.loginEmail}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="loginPassword">Password</Label>
                    <Input
                        type="password"
                        name="loginPassword"
                        id="loginPassword"
                        placeholder="password"
                        onChange={props.handlePasswordInput}
                        value={props.loginPassword} />
                    <div><a href="#">Forgot your password?</a></div>
                </FormGroup>
                <Button className="m-2" color="primary" > Log In</Button>{' '}
                <Button color="secondary">Cancel</Button>
                <ModalFooter>
                    <p>Not a member? <Link to="/" onClick={props.toggleForm} >Sign up here</Link> </p>

                </ModalFooter>

            </Form>
        </>
    );
};

export default LogIn;

