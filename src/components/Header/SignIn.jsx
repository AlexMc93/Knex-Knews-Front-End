import React, { Component } from 'react';
import Loader from '../Generic/Loader';
import * as api from '../../api/api';

class SignIn extends Component {

    state = {
        input: '',
        invalid: false,
        isLoading: false,
        showForm: false
    }

    render() {

        const { input, invalid, isLoading, showForm } = this.state;

        if (isLoading) return <Loader />

        return (
            <>
            {showForm ? <form onSubmit={this.handleValidation}>
                            <input className="username-input" onChange={this.handleInput} value={input} placeholder="Username" />
                            <button className="sign-in-here-btn">Sign in</button>
                            {invalid ? <p className="sign-in-error">That username is not valid, try again!</p> : null}
                        </form>
                      : <button className="sign-in-here-btn" onClick={this.toggleForm}>Sign in here</button>}
            </>
        );
    }

    toggleForm = () => {
        this.setState((currentState) => {
            return {showForm: !currentState.showForm}
        })
    }

    handleInput = ({target: { value } }) => {
        this.setState({input: value})
    }

    handleValidation = (event) => {
        event.preventDefault()
        const { input } = this.state;
        const { logIn } = this.props;

        this.setState({isLoading: true})

        api.fetchSingleUser(input)
        .then((user) => {
            logIn(user.username)
        })
        .catch((err) => {
            this.setState({invalid: true, isLoading: false})
        })
    }
}

export default SignIn;