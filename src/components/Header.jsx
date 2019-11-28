import React from 'react';
import { auth } from '../firebase/firebase.utils';
import history from "../history";

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: props.signIn
        }
    }

    _handleClick = event => {
        this.setState({
            isSignedIn: !this.state.isSignedIn
        })
        history.push('/');
        auth.signOut();
    }


    render() {
        const currentUser = this.props.signIn;
        return(
            <div className = 'header'>
                <h1 className ="header-title" > Student Database </h1> 
                {
                currentUser ? 
                <div className='option' onClick= {this._handleClick}>SIGN OUT</div> 
                :
                null
            }
            </div>
        )
    }
}

export default Header;