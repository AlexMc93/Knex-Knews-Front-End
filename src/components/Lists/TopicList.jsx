import React, { Component } from 'react';
import * as api from '../../api/api';
import { Link } from '@reach/router';
import Loader from '../Generic/Loader';
import ErrorDisplay from '../Generic/ErrorDisplay';

class TopicList extends Component {

    state = {
        topics: [],
        isLoading: true,
        errMsg: ''
    }

    componentDidMount() {
        this.getTopics()
    }

    render() {

        const { topics, isLoading, errMsg } = this.state;
        const { toggle } = this.props;

        if (isLoading) return <nav><Loader /></nav>
        if (errMsg) return <ErrorDisplay msg={errMsg}/>

        return (
            <>
                <Link to="/" key="all" onClick={toggle}>
                    <button className="discover-btn">All</button>
                </Link>
                {
                    topics.map(({slug}) => {
                    return <Link to={`/topics/${slug}`} key={`${slug}`} onClick={toggle}>
                            <button className="discover-btn">{slug}</button>
                            </Link>
                    })
                }
            </>
        );
    }

    getTopics() {
        api.fetchTopics()
        .then((topics) => {
            this.setState({ topics, isLoading: false })
        })
        .catch((err) => {
            this.setState({errMsg: err, isLoading: false})
        })
    }
}

export default TopicList;