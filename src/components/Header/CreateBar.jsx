import React from 'react';
import { Link } from '@reach/router';

const CreateBar = (props) => {
    return (
        <>
            <Link to='/create/newArticle' onClick={props.toggle}><button className="nav-btn-sub">Write an article</button></Link>
            <br/>
            <Link to='/create/newTopic' onClick={props.toggle}><button className="nav-btn-sub">Create a new topic</button></Link>
        </>
    );
};

export default CreateBar;