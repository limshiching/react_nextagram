import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import axios from 'axios';
import Loading from './components/Loading';
import Homepage from './page/Homepage';
import UserProfilePage from './page/UserProfilePage';
import MyProfilePage from './page/MyProfilePage';
// import UserModal from './components/UserModal';
import UploadPage from './page/UploadPage';

class App extends React.Component {
  state = {
    users: [],
    loading: true,
  };

  componentDidMount = () => {

    // let JWT = JSON.parse(localStorage.getItem("JWT"));

    axios({
      method: "GET",
      url: "https://insta.nextacademy.com/api/v1/users/",
      // headers: {
      //   Authorization: `Bearer ${JWT.auth_token}`
      // }
    }).then(result => {
      console.log(result);
    });

    axios.get('https://insta.nextacademy.com/api/v1/users').then(result => {
      this.setState({
        users: result.data,
        loading: false
      });
      // setTimeout(() => { this.setState({ isLoading: false }) }, 50)
    });
  };

  render() {
    const { users, loading } = this.state;

    return (

      <>
        <NavBar />

        <Loading loading={loading} />

        <Switch>
          <Route exact path="/" component={props => <Homepage {...props} users={users} />} />
          <Route exact path="/users/:id" component={props => <UserProfilePage {...props} />} />
          <Route path="/profile" component={props => <MyProfilePage users={users} {...props} />} />
          <Route exact path="/uploadpage" component={UploadPage} />

        </Switch>



      </>
    );
  }
}


export default App;

