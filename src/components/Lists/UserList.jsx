import React, { Component } from 'react';
import Loader from '../Generic/Loader';
import UserCard from '../Cards/UserCard';
import ErrorDisplay from '../Generic/ErrorDisplay';
import * as api from '../../api/api';

class UserList extends Component {

    state = {
        users: [],
        sort_by: 'username',
        order: 'asc',
        isLoading: true,
        errMsg: ''
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const { users, isLoading, errMsg } = this.state;

        if (isLoading) return <Loader />
        if (errMsg) return <ErrorDisplay msg={errMsg} />

        return (
            <ul className="user-list">
            <h2 className="page-title">All users</h2>
                <div className="sort-stuff">
                <label>
                    Sort: 
                    <select onChange={this.handleSort}>
                        <option value="username">Username</option>
                        <option value="contributions">Contributions</option>
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

                {users.map((user) => {
                    return <UserCard {...user} key={user.username} />
                })}
            </ul>
        );
    }

    handleSort = (event) => {
        const { value } = event.target;
        const { users, order } = this.state;

        const sortedUsers = [...users];

        if (order === 'desc') {
            sortedUsers.sort((a, b) => b[value] - a[value])
        } else {
            sortedUsers.sort((a, b) => a[value] - b[value])
        }

        this.setState({users: sortedUsers, sort_by: value})
    }

    handleOrder = (event) => {
        const { value } = event.target;
        const { order, users } = this.state

        if (value !== order) {
            users.reverse();
            this.setState({users, order: value})
        }
    }

    getContributionsAndVotes(user) {
       return api.fetchArticles(undefined, undefined, undefined, user.username)
        .then(({articles}) => {
            user.votes = articles.reduce((acc, cur) => acc + cur.votes, 0)
            user.contributions = articles.length
            return user;
        })
    }

    getUsers(newSort, newOrder) {
        const { sort_by, order } = this.state;

        api.fetchUsers(newSort || sort_by, newOrder || order)
        .then((users) => {
           return Promise.all(users.map((user) => this.getContributionsAndVotes(user)))
        })
        .then((users) => {
            this.setState({users, isLoading: false, sort_by: newSort || sort_by, order: newOrder || order})
        })
        .catch((err) => {
            this.setState({errMsg: err, isLoading: false})
        })
    }
}

export default UserList;