# KNEX KNEWS :newspaper: :clipboard:

This is a React web app allowing users to browse and read articles in various topic categories. Other features include comments, votes and article creation - similar to [Reddit](https://www.reddit.com/)

A hosted version of this project can be found [here](https://knex-knews.netlify.app/). It was primarily styled with mobile users in mind. By default you are logged in as `AlexMc93`, allowing full use of site functionality. Upon logging out, some features become unavailable. It is possible to log in as another user, but this user must already exist - try `jessjelly` or `grumpy19`!

This builds upon a [previous project](https://github.com/AlexMc93/Knex-Knews), where I developed the back-end API which serves the necessary data to the front-end. A hosted version of the API can be found [here](https://alex-mc-news-app.herokuapp.com/api/)

This project formed part of the front-end phase of my time studying on the Northcoders full-stack bootcamp and was primarily created on a week-long sprint in February 2021.

This project utilizes the following tech:

- [React](https://reactjs.org/) - interactive UI
- [Axios](https://www.npmjs.com/package/axios) - API requests
- [React Router](https://reach.tech/router/) - routing

As well as some add-ons like [React Spinners](https://www.npmjs.com/package/react-spinners).

## Set-up

If you wish to run this project locally on your machine, first you will need to clone this repository by running the following command in your terminal:

```
git clone https://github.com/AlexMc93/Knex-Knews-Front-End.git
```

You will need to have installed [node.js](https://nodejs.org/en/) (v14.14.0 or later) on your machine. This can be checked by running `node -v`. Then you can run the following command to install dependencies:

```
npm install
```

Finally, by running the following command the application should load in your default browser:

```
npm start
```

## To-do list

- Improved styling, particularly for desktop users (design is a skill I am definitely looking to improve, although my focus is on improving my development skills for now!)
- Dark mode
- Password protection for users
- Ability to sign up as a new user
- Ability to save an article draft for later
- Random article and search added to discover bar
- Infinite scroll

## Contributors

All production code has been written by me, Alex McCarrick, with some help from the superb tutors at [Northcoders](https://northcoders.com/).

### Any comments, feedback or questions are welcome. Thanks for reading!
