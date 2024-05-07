## Slack message API using Node JS

### Create an API / endpoint that can send a custom message to a slack a channel via the api.

1. Tasks required
* Set up Node JS express server
* Create file for implementation 
* Create necessary env variables
* Integrate with Slack API
* For testing access Postman

2. Time estimation 
* Node server set up and express js setup can take around 15 minutes
* Implementing of API request estimated time is around 30 minutes
* To integrate with Slack API and the endpoint creation, I estimate roughly 20 minutes
* Testing will take around 15 minutes

3. Implementation / setup steps 
* First, you need to make sure Node is installed on your system. Please go to https://nodejs.org/en/download for further information
* Once you have Node installed, install Express, Axios and Json Web Token - npm install express axios jsonwebtoken
* Create and Express js server and a middleware called 'verifyToken' to verify the JWT token that is sent on the request
* Create an asynchronous endpoint for the message sending which goes through the 'verifyToken' middleware which expects a JSON payload containing the message to the slack channel
  
4. Testing the API
* The endpoint '/generate-token' is used for testing. It will generate a JWT token for auth
* Please provide a secret key and slack channel id in the required fields. 
* Set up an access token env variable using dotenv - npm install --save-dev dotenv
* Create an .env file and provide your access token - SLACK_ACCESS_TOKEN=your slack access token
* Update your package.json file in the scripts section with - 
"scripts": {
  "start": "dotenv -- node server.js"
}
* To test your API endpoint, first run the server - node index.js 
* Open Postman and create a new POST request to the '/generate-token' endpoint
* Set the URL to 'http://localhost:3000/generate-token'
* Send request
* You will receive the JWT token in the response 
* Then send a message using '/send-message' endpoint , set the request URL to 'http://localhost:3000/send-message'
* Set the auth header to 'Bearer JWT TOKEN' with JWT TOKEN being your token you received
* Set the content type to 'application/json'
* In the request body, you may provide the message you wish to send with the JSON object 'message' - {
    "message": "Here is my message"
}
* Send the request





   
