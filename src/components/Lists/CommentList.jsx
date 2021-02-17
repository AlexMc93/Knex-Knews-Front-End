import React, { Component } from 'react';
import Loader from '../Generic/Loader';
import CommentCard from '../Cards/CommentCard';
import * as api from '../../api/api';
import PostComment from '../Generic/PostComment';
import ErrorDisplay from '../Generic/ErrorDisplay';

class CommentList extends Component {

    state = {
        comments: [],
        comment_count: 0,
        sort_by: 'created_at',
        order: 'desc',
        isLoading: true,
        errMsg: '',
        page: 1
    }

    componentDidMount() {
        this.getComments()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getComments()
        }
    }

    render() {
        const { comment_count, comments, isLoading, errMsg, page } = this.state;
        const { user } = this.props;

        if (isLoading) return <Loader />
        if (errMsg) return <ErrorDisplay msg={errMsg} />
        
        return (
            <ul className="comment-list">
                {user ? <PostComment id={this.props.article_id} addNew={this.handleNewComment} user={this.props.user}
                /> : <p>Sign in at the top of the screen to post a comment</p>
                }
                <span className="divider-2"></span>
                <div className="sort-stuff">
                <label>
                    Sort: 
                    <select onChange={this.handleSort}>
                        <option value="created_at">Date</option>
                        <option value="votes">Popularity</option>
                    </select>
                </label>

                <label>
                    Order:
                    <select onChange={this.handleOrder}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </label>
                </div>

                {comments.map((comment) => {
                   return <CommentCard key={comment.comment_id} {...comment} user={this.props.user} handleDelete={this.handleDelete}/>
                })}
                <br/><br/>

                {comment_count > 10 ? <>
                <button disabled={page === 1} onClick={this.handlePageChange} value="back">⬅️</button>
                <button disabled={(comment_count / 10) <= page} onClick={this.handlePageChange} value="forward">➡️</button></>
                : null}
            </ul>
        );
    }

    handlePageChange = ({ target: { value } }) => {

        if (value === "back") {
            this.setState((currentState) => {
                return {page: currentState.page - 1}
            })
        } else if (value === "forward") {
            this.setState((currentState) => {
                return {page: currentState.page + 1}
            })
        }
    }

    handleSort = ({ target: { value } }) => {
        this.getComments(value);
    }

    handleOrder = ({ target: { value } }) => {
        this.getComments(undefined, value)
    }

    handleNewComment = (newComment) => {
        this.props.increment()
        this.setState((currentState) => {
            return {comments: [newComment, ...currentState.comments]}
        })
    }

    handleDelete = (id) => {

        this.setState({isLoading: true})

        api.deleteComment(id)
        .then(() => {
            this.getComments()
        })
        .catch(({response: { data: { msg } } }) => {
            this.setState({errMsg: msg, isLoading: false})
        })
    }

    getComments(newSort, newOrder) {
        const { article_id } = this.props;
        const { sort_by, order, page } = this.state;

        api.getArticleComments(article_id, newSort || sort_by, newOrder || order, page)
        .then(({comment_count, comments}) => {
            this.setState({ comment_count, comments, isLoading: false, sort_by: newSort || sort_by, order: newOrder || order})
        })
        .catch(({response: { data: { msg } } }) => {
            this.setState({errMsg: msg, isLoading: false})
        })
    }
}

export default CommentList;