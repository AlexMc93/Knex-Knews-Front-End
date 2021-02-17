import React, { Component } from 'react';
import Loader from './Loader';
import * as api from '../../api/api';

class PostComment extends Component {

    state = {
        input: '',
        isInputError: false,
        isLoading: false,
        errMsg: ''
    }

    render() {

        const { isInputError, isLoading, errMsg } = this.state

        return (
            <form onSubmit={this.handleSubmit} className="submit-comment">
                <textarea rows='3' placeholder='Post a new comment!' onChange={this.handleChange} value={this.state.input}/>
                <p><button>Submit Comment</button></p>
                {}
                {isInputError ? <p>Sorry - you can't submit an empty comment! Please add some of your wonderful opinions</p> : null}
                {isLoading ? <Loader /> : null}
                {errMsg ? <p>{errMsg}</p> : null}
            </form>
        );
    }

    handleChange = ({ target: { value } }) => {
        this.setState({input: value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { id, addNew, user } = this.props;
        const { input } = this.state;

        this.setState({isLoading: true})

        if (input.length === 0) {
            this.setState({isInputError: true, isLoading: false})
        } else {
            api.postComment(id, user, input)
            .then(({comment}) => {
                const {author, created_at, body, votes, comment_id} = comment;
                addNew({author, created_at, body, votes, comment_id});
                this.setState({input: '', isInputError: false, isLoading: false})
            })
            .catch((err) => {
                this.setState({errMsg: err, isLoading: false})
            })
        }
    }
}

export default PostComment;