import { Link } from '@reach/router';
import React from 'react';

const UserCard = (props) => {

    const {username, avatar_url, contributions, votes} = props;

    return (
        <li>
            <Link to={`/users/${username}`}><strong><p>{username}</p></strong>
            <img src={avatar_url} alt={`${username}'s avatar`} /></Link>
            <p>Contributions: {contributions}
            <br/>Votes: {votes}</p>
        </li>
    );
};

export default UserCard