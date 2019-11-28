import React from 'react';
import { auth, signInWithGoogle } from '../firebase/firebase.utils';
import history from '../history';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ""
        }
    }

    _handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    _handleFormSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password).then((status) => {
            history.push("/dashboard");
            this.setState({ email: "", password: "" })
        }).catch((error) => {
            alert("Invalid Email Id or password");
            console.error("Unable to authenticate " + error)
        });
    }

    _handleSignInWithGoogle = e => {
        signInWithGoogle().then((status) => {
            history.push("/dashboard");
        });
    }


    render() {
        const {email, password } = this.state;
        return(
            <div className="signIn">
                <h2 className='title'> Sign in with user name and password</h2>
                <form className= "sign-in" onSubmit = {this._handleFormSubmit}>
                    <br />
                    <label>EmailId</label>
                    <br />
                    <input
                        type="email"
                        name="email"
                        value= {email}
                        onChange ={this._handleChange}
                        required
                    />
                    <br />
                    <br />
                    <label>Password</label>
                    <br />
                    <input
                        type = "password"
                        name="password"
                        value= {password}
                        onChange ={this._handleChange}
                        required
                    />
                    <br />
                    <div className = "style-alignment" >
                        <button className="button" onClick = {this._handleFormSubmit}> Sign In</button>
                        <button className="button" onClick ={this._handleSignInWithGoogle}>Sign In with Google</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;
