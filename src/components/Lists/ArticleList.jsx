import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../../api/api';
import ArticleCard from '../Cards/ArticleCard';
import ErrorDisplay from '../Generic/ErrorDisplay';
import Loader from '../Generic/Loader';

class ArticleList extends Component {

    state = {
        articles: [],
        article_count: 0,
        sort_by: 'created_at',
        order: 'desc',
        isLoading: true,
        errMsg: '',
        page: 1
    }

    componentDidMount() {
        this.getArticles()
    }

    componentDidUpdate(prevProps, prevState) {
        
        const requiresFetch = prevProps.topic !== this.props.topic || prevState.page !== this.state.page || prevState.order !== this.state.order || prevState.sort_by !== this.state.sort_by

        if (requiresFetch) this.getArticles()
    }

    render() {

        const { articles, isLoading, errMsg, article_count, page, sort_by, order } = this.state;
        const { topic } = this.props;

        if (isLoading) return <section className="article-list"><Loader /></section>
        if (errMsg) return <ErrorDisplay msg={errMsg} />

        return (
            <ul className="article-list">
                {topic ? <h2 className="page-title">{topic}</h2> : <h2 className="page-title">All topics</h2>}
                <div className="sort-stuff">
                <label>
                    Sort: 
                    <select value={sort_by} onChange={this.handleSort}>
                        <option value="created_at">Date</option>
                        <option value="votes">Popularity</option>
                        <option value="comment_count">Discussion</option>
                    </select>
                </label>
                <label>
                    Order: 
                    <select value={order} onChange={this.handleOrder}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </label>
                </div>
                <section className="article-previews">
                { articles.length ?
                    articles.map((article) => {
                        return <ArticleCard {...article} key={article.article_id} user={this.props.user} handleDelete={this.handleDelete}/>
                    })

                    : <p>Sorry, no articles found. Click below to create one. <br/><br/> <Link to='/create/newArticle'><button className="nav-btn-sub">Write an article</button></Link> </p>
                }
                </section>
                <br/><br/>
                {article_count > 10 ? <>
                <button disabled={page === 1} onClick={this.handlePageChange} value="back">⬅️</button>
                <button disabled={(article_count / 10) <= page} onClick={this.handlePageChange} value="forward">➡️</button></>
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
        this.setState({sort_by: value})
    }

    handleOrder = ({ target: { value } }) => {
        this.setState({order: value})
    }

    handleDelete = (id) => {

        const { sort_by, order } = this.state;

        this.setState({isLoading: true})

        api.deleteArticle(id)
        .then(() => {
            this.getArticles(sort_by, order)
        })
        .catch(({ response: { data: { msg } } }) => {
            this.setState({errMsg: msg, isLoading: false})
        })
    }

    getArticles() {

        const { topic } = this.props;
        const { page, sort_by, order } = this.state;

        this.setState({isLoading: true});

        api.fetchArticles(topic, sort_by, order, undefined, page)
        .then(({article_count, articles}) => {
            this.setState({ articles, article_count, isLoading: false})
        })
        .catch(({ response: { data: { msg } } }) => {
            this.setState({errMsg: msg, isLoading: false})
        })
    }
}

export default ArticleList;