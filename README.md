​

## `ArticleList.jsx`

Your `handleSort()` and `handleOrder()` methods that are being passed to your `<select>` boxes are calling `getArticles()` directly.
`getArticles()` sets the state of the input _after_ the network request has resolved and your code runs the function in your `.then`/`.catch` block.
​
If a user selects sort and then quickly selects order the UI will not reflect what is in state and the request will be using an old value.
​
A better approach here would be to make sure the users selection is reflected in state straight away before the network request is made (hint: this wouldn't be just setting the state then calling `getArticles()` within your `handleSort()` method!).
