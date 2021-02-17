import React from 'react';
import { Link } from '@reach/router';
import Vote from '../Generic/Vote';
import DeleteContent from '../Generic/DeleteContent';

const ArticleCard = (props) => {

    const { title, topic, author, votes, comment_count, article_id, body, created_at, user, handleDelete} = props;

    return (
       <li>
         <p className="article-card-subinfo">Topic: {topic}</p>
        <Link to={`/articles/${article_id}`}>
           <h3 className="article-card-title">{title}</h3>
        </Link>
           <p className="article-card-subinfo">by {author} on {new Date(created_at).toLocaleDateString()}</p>
           <p className="article-card-preview">"{body.slice(0, 75)}..."</p>
           <p className="article-card-extrainfo">Comments: {comment_count}</p>
        <Vote votes={votes} content="articles" id={article_id} />
         {
            user === author ?
            <DeleteContent type="article" id={article_id} handleDelete={handleDelete}/>
            : null
         }
       </li>
    );
};

export default ArticleCard;