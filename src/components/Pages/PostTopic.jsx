import { navigate } from '@reach/router';
import React, { Component } from 'react';
import * as api from '../../api/api';
import ErrorDisplay from '../Generic/ErrorDisplay';

class PostTopic extends Component {

    state = {
        description: '',
        slug: '',
        inputError: false,
        errMsg: ''
    }

    render() {

        const { description, slug, inputError, errMsg } = this.state;

        if (errMsg) return <ErrorDisplay msg={errMsg} />

        return (
            <form onSubmit={this.handleSubmit} className="create-form">
            <h2 className="page-title">Create a topic</h2>
                <input className="submit-title" onChange={this.handleInput} id="slug" placeholder="Topic name" value={slug} />
                <textarea rows='2' onChange={this.handleInput} id="description" placeholder="Add a description" value={description} className="submit-body"/>
                <button className="more-btn">Create new topic</button>
                {inputError ? <p className="post-error">Both fields require some text</p> : null}
            </form>
        );
    }

    handleInput = ({ target: { value, id } }) => {
        this.setState({ [id]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { description, slug } = this.state;

        if (!description || !slug) {
            this.setState({inputError: true})
        } else {
            const newTopic = { description, slug }
            this.postTopic(newTopic)
        }
    }

    postTopic(newTopic) {
        api.postTopic(newTopic)
        .then(() => {
            navigate('/')
        })
        .catch((err) => {
            this.setState({errMsg: err})
        })
    }
}

export default PostTopic;