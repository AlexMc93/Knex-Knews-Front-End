import React from 'react';
import { Link } from '@reach/router';

const NavBar = (props) => {
    return (
        <nav>
            <button className="nav-btn" onClick={props.toggleCreate}>Create</button>
            <button className="nav-btn" onClick={props.toggleDiscover}>Discover</button>
            <Link to='/users'><button className="nav-btn" >Community</button></Link>
        </nav>
    );
};

export default NavBar;