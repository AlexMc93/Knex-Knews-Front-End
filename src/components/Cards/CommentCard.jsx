import React from 'react';
import DeleteContent from '../Generic/DeleteContent';
import Vote from '../Generic/Vote';

const CommentCard = (props) => {

    const { author, created_at, body, votes, comment_id, user, handleDelete } = props;

    return (
        <li className="comment-card">
            <h4>{author}, {new Date(created_at).toLocaleDateString()}</h4>
            <p>{body}</p>
            <Vote votes={votes} content="comments" id={comment_id}/>
            {
                user === author ?
                <DeleteContent type="comment" id={comment_id} handleDelete={handleDelete}/>
                : null
            }
        </li>
    );
};

export default CommentCard;