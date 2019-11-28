import React from 'react';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (confirmPassword !== password) {
            alert("Password Miss Match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
            alert("Successfuly register the Student Login");
        } catch (error) {
            alert("Unable to register the student logIn. Please try later");
            console.error("Error authontication" + error);
        }

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="signUp">
                <h2 className='title'>I do not have an account</h2>
                <span> Sign up with your email and password</span>
                <form className='sign-up' onSubmit={this.handleSubmit}>
                    <br />
                    <label> Display Name</label>
                    <br />
                    <input
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />

                    <br />
                    <label>Email Id</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label='Email Id'
                        required
                    />

                    <br />
                    <label> Password</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />

                    <br />
                    <label> Confirm Password</label>
                    <br />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        required
                    />
                    <br />
                    <div className="button-wrapper">
                        <button className = "button" onClick = {this.handleSubmit}> Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;
