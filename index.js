const express = require('express');
const jwt_token = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'secret key'; // Secret key


// Verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ auth: false, message: 'Please provide token.' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
};

// API endpoint to send message 
app.post('/send-message', verifyToken, async (req, res) => {
    try {
        const { message } = req.body;
        // Send a POST request to Slack API 
        const slackResponse = await axios.post('https://slack.com/api/chat.postMessage', {
            channel: 'slack channel ID', // Slack channel ID
            text: message,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.SLACK_ACCESS_TOKEN}`, // Slack access token environment variable
                'Content-Type': 'application/json'
            }
        });
        res.status(200).send({ success: true, message: 'Message sent to Slack channel.' });
    } catch (error) {
        console.error('Error sending message to Slack:', error.response.data);
        res.status(500).send({ success: false, message: 'Failed to send message to Slack channel.' });
    }
});

// API endpoint to generate JWT token 
app.post('/generate-token', (req, res) => {
    // Generate JWT token 
    const token = jwt.sign({ id: 'user_id' }, SECRET_KEY, { expiresIn: 86400 }); // 24 hour expiration
    res.status(200).send({ auth: true, token: token });
  });