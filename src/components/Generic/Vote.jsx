import React, { Component } from 'react';
import * as api from '../../api/api';

class Vote extends Component {

    state = {
        voteChange: 0,
        isError: false,
    }

    render() {

        const { votes } = this.props;
        const { voteChange, isError } = this.state;

        return (
            <>
            <p className="vote-count">Votes: {votes + voteChange}</p>
            <button disabled={voteChange === 1} onClick={() => {this.handleVote(1)}}>⬆️</button>
            <button disabled={voteChange === -1} onClick={() => {this.handleVote(-1)}}>⬇️</button>
            {isError ? <p className="vote-error">Sorry, there was a problem adding your vote. Please try again!</p> : null}
            </>
        );
    }

    handleVote = (upOrDown) => {

        const { content, id } = this.props;

        this.setState((currentState) => {
            return {voteChange: currentState.voteChange + upOrDown, isError: false}
        });
        api.patchVotes(content, id, upOrDown).catch(() => {
            this.setState({voteChange: 0, isError: true});
        })
    } 
}

export default Vote;


