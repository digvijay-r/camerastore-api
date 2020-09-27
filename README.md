# camerastore-api
REST APIs for e-commerce system for your local camera store where people can come and buy cameras.

## Tech used

The tech stack used here is:

* [node.js](https://nodejs.org/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework
* [MongoDb](https://www.mongodb.com/) - NoSQL Document database with scalability and flexibility.



## Installation

Project requires [Node.js](https://nodejs.org/) and [MongoDb](https://www.mongodb.com/) on system to run.

* Clone the repository

        `git clone https://github.com/digvijay-r/camerastore-api.git`

* Install dependencies and dev dependencies

        `npm install`

* Goto repository directory

        `cd camerastore-api`

* Start the Server

        `npm start`

Note: Set environment variables for server port - PORT , mongoDb connnection url - MONGODB_URL and
    jwt token - JWT_SECRET_KEY
    Also if not changed then start mongo server must be running on local machine on default port 27017

## API Documentation

Check the API documentation at:

https://documenter.getpostman.com/view/11034395/TVKHUvQF

Also the JSON documentation file is Camera Store API.postman_collection.json 
