import React from 'react';
import logo from '../../assets/logo.jpg';
import SignIn from './SignIn';
import { Link } from '@reach/router';

const Header = (props) => {

    const { user, logOut, logIn } = props;

    return (
        <header className="header">
            <Link to='/' ><img src={logo} alt="knex knews logo" className="logo" /></Link>
            <h1 className="main-title">Knex Knews</h1>
            {user ? <p className="log-in-text"><button className="sign-out-btn" onClick={logOut}>Sign out</button><>Logged in as: <strong className="signed-in-username">{user}</strong><br/></> 
            </p> 
            : <SignIn logIn={logIn}/>}
        </header>
    );
};

export default Header;