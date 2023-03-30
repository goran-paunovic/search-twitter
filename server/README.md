# Twitter explorer server

Node.js server application.

Server is needed cause Twitter API do not send the Access-Control-Allow-Origin in their response headers.

# Environment variables

You need to create .env file with these variables:

TWITTER_CONSUMER_KEY=your Twitter API consumer key

TWITTER_CONSUMER_SECRET=your Twitter API consumer secret

# Install the dependencies

npm install

# Start the server

While in the project directory, run 'npm start' or 'node server.js' in the console.

Your server will be running on htpp://localhost:4000

Server has CORS enabled and is allowing connections from htpp://localhost:3000 and htpp://localhost:5000 by default.

If your client application is deployed elsewhere you need to change server.js file and add url to the list of allowed urls.
