import React, { Component } from 'react';
import Loader from '../Generic/Loader';
import { navigate } from '@reach/router';
import * as api from '../../api/api';
import ErrorDisplay from '../Generic/ErrorDisplay';

class PostArticle extends Component {

    state = {
        title: '',
        body: '',
        topic: '',
        topicList: [],
        isLoading: true,
        inputError: false,
        errMsg: ''
    }

    componentDidMount() {
        this.getTopics()
    }

    render() {

        const { title, body, topicList, isLoading, inputError, errMsg } = this.state;
        const { user } = this.props;

        if (isLoading) return <Loader />
        if (errMsg) return <ErrorDisplay msg={errMsg} />
        if (!user) return <p>You must be signed in to submit an article. Please sign in at the top of the screen</p>

        return (
            <form onSubmit={this.handleSubmit} className="create-form">
            <h2 className="page-title">Create an article</h2>
                <input onChange={this.handleInput} id='title' placeholder='Article Title' value={title} className="submit-title" />
                <br/><br/>
                <select onChange={this.handleInput} id='topic'>
                    <option value='' id=''>Select a topic</option>
                    {topicList.map((topic) => {
                        return <option value={topic.slug} key={topic.slug}>
                            {topic.slug}
                        </option>
                    })}
                </select>
                <br/><br/>
                <textarea className="submit-body" rows='10' placeholder='Your article goes here!' onChange={this.handleInput} value={body} id='body'/>
                <button className="more-btn">Post Article</button>
                {inputError ? <p className="post-error">All fields must be filled in to submit an article</p> : null}
            </form>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const { title, body, topic } = this.state;
        const { user } = this.props;

        if (!title || !body || !topic) {
            this.setState({inputError: true})
        } else {
            const articleToPost = { title, author: user, topic, body};
            this.postArticle(articleToPost)
        }
    }

    handleInput = ({target: { value, id } }) => {
        this.setState({ [id]: value })
    }

    getTopics() {
        api.fetchTopics()
        .then((topics) => {
            this.setState({ topicList: topics, isLoading: false })
        })
        .catch((err) => {
            this.setState({errMsg: err, isLoading: false}) 
        })
    }

    postArticle(newArticle) {

        this.setState({isLoading: true})

        api.postArticle(newArticle)
        .then((newId) => {
            navigate(`/articles/${newId}`)
        })
        .catch((err) => {
            this.setState({errMsg: err, isLoading: false}) 
        })
    }
}

export default PostArticle;