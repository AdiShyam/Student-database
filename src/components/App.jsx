import React from 'react';
import './App.css';
import Header from './Header';
import SignInSignUp from './SignInSIgnUp';
import StudentDetail from './StudentDetail';
import Dashboard from './Dashboard';
import { auth } from '../firebase/firebase.utils';
import { Switch, Route, Router } from 'react-router-dom';
import history from '../history'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async user => {
      await this.setState({currentUser: user})
      console.log("the user is ", user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    let signInStatus = this.state.currentUser? true: false;
    return (
      <div className="App">
        <Router history = {history} >
          <Header signIn={signInStatus} />
          <Switch>
            <Route excat path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/signIn" component = {SignInSignUp} /> */}
            <Route exact path="/:id" component = {StudentDetail} />
            {/* {
              (SignInSignUp)
              ?
              <Route excat path="/dashboard" component={Dashboard} />
              :
              <Route excat path="/" component={SignInSignUp} />
            } */}
            <Route excat path="/" component={SignInSignUp} />
            {/* <Route
              excat
              path="/"
              render={() =>
                signInStatus ? (
                  // history.push("/dashboard")
                  <Dashboard />
                  // <Redirect to="/dashboard" />
                  ) : (
                    <SignInSignUp />
                  )
              }
            /> */}
            
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

// <Route
//             excat
//             path="/signIn" 
//             render={() =>
//               signInStatus ? (
//                 <Redirect to="/" />
//               ) : (
//                   <SignInSignUp />
//                 )
//             }
//           />