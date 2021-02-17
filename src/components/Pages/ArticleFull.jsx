import React, { Component } from 'react';
import Loader from '../Generic/Loader';
import * as api from '../../api/api';
import Vote from '../Generic/Vote';
import { Link, navigate } from '@reach/router';
import CommentList from '../Lists/CommentList';
import ErrorDisplay from '../Generic/ErrorDisplay';
import DeleteContent from '../Generic/DeleteContent';

class ArticleFull extends Component {

    state = {
        article: {},
        isLoading: true,
        comments: [],
        sort_by: 'created_at',
        order: 'desc',
        errMsg: '',
        hasBeenDeleted: false,
        increment: 0
    }

    componentDidMount() {
        this.getArticle()
    }

    render() {

        const { article, isLoading, errMsg, hasBeenDeleted, increment} = this.state;
        const { user } = this.props;
        const { title, topic, body, author, article_id, votes, comment_count, created_at} = article;

        if (hasBeenDeleted) return (
        <><p>Deletion in progress, you will be automatically returned to the topic page soon...</p>
        <p>If it is taking too long, <Link to={`/topics/${topic}`}>click here</Link></p>
        <Loader /></>
        )
        if (isLoading) return <Loader />
        if (errMsg) return <ErrorDisplay msg={errMsg} />

        return (
            <>
            <article>
                <h2>{title}</h2>
                <h4>by {author} on {new Date(created_at).toLocaleDateString()}</h4>
                <p>{body}</p>
                <Vote votes={votes} content="articles" id={article_id}/>
            </article>
            <br/>
            {
                user === author ?
                <DeleteContent type="article" id={article_id} handleDelete={this.handleDelete} />
                : null
            }
            <Link to={`/topics/${topic}`}><button className="more-btn">More on this topic</button></Link>
            <Link to={`/users/${author}`}><button className="more-btn">More from this author</button></Link>

            <span className="divider-2"></span>

            <p>Total Comments: {comment_count + increment}</p>

            <CommentList article_id={article_id} user={this.props.user} increment={this.incrementCount}/>

            </>
        );
    }

    incrementCount = () => {
        this.setState((currentState) => {
            return {increment: currentState.increment + 1}
        })
    }

    getArticle() {
        const { article_id } = this.props;

        api.fetchFullArticle(article_id)
        .then((article) => {
            this.setState({ article, isLoading: false})
        })
        .catch(({ response: { data : { msg } } }) => {
            this.setState({errMsg: msg, isLoading: false})
        })
    }

    handleDelete = (id) => {

        const { topic } = this.state.article

        this.setState({isLoading: true})

        api.deleteArticle(id)
        .then(() => {
            this.setState({hasBeenDeleted: true})
        })
        .then(() => {
            setTimeout(() => {navigate(`/topics/${topic}`)}, 4000)            
        })
    }
}

export default ArticleFull;