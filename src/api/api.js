import axios from 'axios';

const request = axios.create({
    baseURL: "https://alex-mc-news-app.herokuapp.com/api"
});

export const fetchTopics = () => {
    return request.get('/topics').then(({ data }) => data.topics)
}

export const fetchArticles = (topic, sort_by, order, author, p) => {
    return request.get('/articles', { params: { topic, sort_by, order, author, p } }).then(({ data }) => data)
}

export const fetchFullArticle = (id) => {
    return request.get(`/articles/${id}`).then(({ data }) => data.article)
}

export const getArticleComments = (id, sort_by, order, p) => {
    return request.get(`/articles/${id}/comments`, { params: { sort_by, order, p } }).then(({ data }) => data)
}

export const postComment = (id, username, body) => {
    return request.post(`/articles/${id}/comments`, { username, body }).then(({ data }) => data)
}

export const deleteComment = (id) => {
    return request.delete(`/comments/${id}`)
}

export const patchVotes = (content, id, voteChange) => {
    return request.patch(`/${content}/${id}`, {
        inc_votes: voteChange
    })
}

export const postArticle = (newArticle) => {
    return request.post('/articles', newArticle).then(({ data: { article } }) => article.article_id)
}

export const deleteArticle = (id) => {
    return request.delete(`/articles/${id}`)
}

export const postTopic = (newTopic) => {
    return request.post('/topics', newTopic)
}

export const fetchUsers = (sort_by, order) => {
    return request.get('/users', { params: { sort_by, order } }).then(({ data }) => data.users)
}

export const fetchSingleUser = (username) => {
    return request.get(`/users/${username}`).then(({ data }) => data.user)
}