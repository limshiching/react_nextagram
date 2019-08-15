import React from 'react';
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import UserModal from './UserModal';
import axios from 'axios';
import { Route, Redirect, Switch } from 'react-router-dom';
import MyProfilePage from '../page/MyProfilePage';
import UploadPage from '../page/UploadPage'
import { withRouter } from "react-router"

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.input = React.createRef();
    this.state = {
      email: "",
      password: "",
      isOpen: false,
      modal: false,
      currentUser: null,
      loginSuccess: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  validateForm() {
    const { email, password } = this.state
    return email.length > 0 && password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    // alert('A name was submitted: ' + this.input.current.value)
  }

  logInUser = (email, password) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/login", {
        email: email,
        password: password
      })
      .then(result => {
        console.log(result.data)
        let JWT = JSON.stringify(result.data);
        console.log(JWT)
        //NOTE: Local storage can only store Strings, that's why need to Stringify it in order to store it. Once stored, need to turn into object again (Parse)
        localStorage.setItem("JWT", JWT);
        this.setState({
          currentUser: result.data.user,
          loginSuccess: true,
        });
        this.props.toggleModal()
        // this.props.history.push(`users/${result.data.user.id}`)
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  signUpUser = (currentUser, email, password) => {
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/users/',
      data: {
        username: currentUser,
        email: email,
        password: password
      }
    })
      .then(result => {
        console.log(result)
        let JWT = JSON.stringify(result.data);
        localStorage.setItem("JWT", JWT);
        this.setState({
          currentUser: result.data.user,
          message: result.data.message,
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };


  logOut = () => {
    localStorage.clear();
    localStorage.removeItem('JWT');
    this.setState({
      currentUser: null,
      loginSuccess: false
    })
    this.props.history.push(`/`)
  }

  render() {
    return (
      <div>
        <Navbar color="primary" light expand="md">
          <NavbarBrand href=""><img src="https://code.nextacademy.com/static/images/next-academy-logo.png" width="40" height="40" />Nextagram</NavbarBrand>
          <Nav className="ml-auto" navbar>
            {localStorage.JWT ?
              <>
                <Link style={{ color: 'black' }} className="m-2" to="/">Home</Link>
                <Link style={{ color: 'black' }} className="m-2" to="/profile">Profile</Link>
                <Link style={{ color: 'black' }} className="m-2" to="/uploadpage">Upload Image</Link>
                <Button color="warning" onClick={this.logOut}>Log Out</Button>

              </>
              :
              <UserModal logInUser={this.logInUser} signUpUser={this.signUpUser} />}
          </Nav>
        </Navbar>
        {this.state.loginSuccess ? <Redirect to="/profile" /> : <Redirect to="/" />}

      </div >
    );
  }
}

export default withRouter(NavBar);

