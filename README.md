## Running the project

- npm install
- npm start

It will automatically deploy at port 5000 and connect to this mongodb instance: mongodb+srv://aaa:aaa@cluster0-j2kad.mongodb.net/test?retryWrites=true&w=majority

The DB instance can be modified by changing the variable in `config.js`

## Testing the project

- npm test


## Features

#### POST /history/add

- Adds watch history for user

| Fields  | Type |
| ------------- | ------------- |
| username  | String  |
| title  | String  |
| description  | String  |
| videoUrl  | String  |
| imageUrl  | String  |

All fields are required. If fields are missing, the server will return status 400.


#### GET /history

| Fields  | Type |
| ------------- | ------------- |
| username  | String  |
| page  | Integer >=0  |

All fields are required. Invalid page input will return status 400. 


#### GET /moviedata

This returns the mock movie JSON.
