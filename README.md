# Social-Network-API

![License Badge](https://img.shields.io/github/license/Mully7773/Social-Network-API)
![Top Language](https://img.shields.io/github/languages/top/Mully7773/Social-Network-API)

## Description 
This is an API for a social network web application where users can create a profile, share their thoughts, make friends, and react to friends’ thoughts. This application utilizes Express.js, MongoDB, Mongoose, and Moment.js. 

## Table of Contents
* [Video](#video)
* [Installation](#installation)
* [Usage](#usage)
* [Endpoints](#endpoints)
* [Tests](#tests)
* [Questions](#questions)
* [License](#license)

## Video:
https://watch.screencastify.com/v/Sqfw4K63tzBg1JR7QYtR

## Installation: 
Please clone the repository from GitHub. This application requires Express, MongoDB, and Mongoose. Next, run `npm install i`. Once the dependencies are finished installing, run `npm start` to connect to the server.

## Usage:
API routes are tested using Insomnia.<br>
You can run your own tests by using the endpoints listed below or you can view my walkthrough video above to see a demo.<br>

## Endpoints:

**User**
- Get all users:        `GET /api/users`
- Get a user by ID:     `GET /api/users/:id`
- Create a user:        `POST /api/users`
- Update a user:        `PUT /api/users/:id`
- Delete a user:        `DELETE /api/users/:id`
- Add a friend:         `PUT /api/users/:userId/friends/:friendId`
- Delete a friend:      `DELETE /api/users/:userId/friends/:friendId`

**Thought**
- Get all thoughts:     `GET /api/thoughts`
- Get a thought by ID:  `GET /api/thoughts/:id`
- Create a thought:     `POST /api/thoughts`
- Update a thought:     `PUT /api/thoughts/:id`
- Delete a thought:     `DELETE /api/thoughts/:id`

**Reaction**
- Add a reaction to a thought:       `PUT /api/thoughts/:id/reactions`
- Delete a reaction to a thought:    `DELETE /api/thoughts/:id/reactions`

## Tests:
There are no tests for this application. 

## Questions:
Feel free to contact me at mully7773@gmail.com if you have any questions. <br>
You can view more of my projects at https://github.com/Mully7773.

## License:
This project is licensed under MIT.