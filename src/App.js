import React, { Component } from 'react';
import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import { Router } from '@reach/router';
import './styles/App.css';
import ArticleList from './components/Lists/ArticleList';
import ArticleFull from './components/Pages/ArticleFull';
import ErrorDisplay from './components/Generic/ErrorDisplay';
import PostArticle from './components/Pages/PostArticle';
import PostTopic from './components/Pages/PostTopic';
import UserList from './components/Lists/UserList';
import UserPage from './components/Pages/UserPage';
import CreateBar from './components/Header/CreateBar';
import DiscoverBar from './components/Header/DiscoverBar';

class App extends Component {

  state = {
    theme: 'default',
    loggedIn: 'AlexMc93',
    showCreate: false,
    showDiscover: false
  }

  render() {

    const { loggedIn, showCreate, showDiscover } = this.state;

    return (
      <main className="App">
      <Header user={loggedIn} logOut={this.logOutUser} logIn={this.logInUser}/>
      <NavBar toggleCreate={this.toggleCreate} toggleDiscover={this.toggleDiscover}/><br/>
      <section className="sub-nav">
      {showCreate ? <CreateBar toggle={this.toggleCreate}/> : null}
      {showDiscover ? <DiscoverBar toggle={this.toggleDiscover}/> : null}
      {!showCreate && !showDiscover ? <span className="divider"></span> : null}
      </section>
      <section className="main-content">
      <Router>
        <ArticleList path="/" user={loggedIn}/>
        <PostTopic path="/create/newTopic" />
        <PostArticle path="/create/newArticle" user={loggedIn} />
        <UserList path="/users" />
        <UserPage path="/users/:username" user={loggedIn}/>
        <ArticleList path="/topics/:topic" user={loggedIn}/>
        <ArticleFull path="/articles/:article_id" user={loggedIn}/>
        <ErrorDisplay default />
      </Router>
      </section>
      </main>
    );
  }

  toggleCreate = () => {
    this.setState((currentState) => {
      return {showCreate: !currentState.showCreate, showDiscover: false}
    })
  }

  toggleDiscover = () => {
    this.setState((currentState) => {
      return {showDiscover: !currentState.showDiscover, showCreate: false}
    })
  }

  logOutUser = () => {
    this.setState({loggedIn: ''})
  }

  logInUser = (username) => {
    this.setState({loggedIn: username})
  }
}

export default App;
