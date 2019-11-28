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
            <Route exact path="/:id" component = {StudentDetail} />
            <Route excat path="/" component={SignInSignUp} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
