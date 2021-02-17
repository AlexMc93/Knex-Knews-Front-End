import React, { Component } from 'react';
import Loader from '../Generic/Loader';
import * as api from '../../api/api';
import UserCard from '../Cards/UserCard';
import ArticleCard from '../Cards/ArticleCard';
import ErrorDisplay from '../Generic/ErrorDisplay';

class UserPage extends Component {

    state = {
        user: {},
        articles: [],
        isLoading: true,
        errMsg: ''
    }

    componentDidMount() {
        this.getUserDetails()
    }

    render() {

        const { user, articles, isLoading, errMsg } = this.state;

        if (isLoading) return <Loader />
        if (errMsg) return <ErrorDisplay msg={errMsg} />

        return (
            <>
            <UserCard {...user} key={user.username} />

            <ul className="article-list">
                { articles.length ?
                    articles.map((article) => {
                        return <ArticleCard {...article} key={article.article_id} user={this.props.user}/>
                    })

                    : <p>{`${user.username}`} has not contributed any articles yet</p>
                }
            </ul>

            </>
        );
    }

    getUserDetails() {

        const { username } = this.props;

        api.fetchSingleUser(username)
        .then((user) => {
            return Promise.all([user, api.fetchArticles(undefined, undefined, undefined, username)])
        })
        .then(([user, { articles }]) => {
            user.votes = articles.reduce((acc, cur) => acc + cur.votes, 0);
            user.contributions = articles.length;
            this.setState({isLoading: false, user, articles})
        })
        .catch((err) => {
           this.setState({errMsg: `Woopsie! User ${username} not found`, isLoading: false});
        })
    }
}

export default UserPage;