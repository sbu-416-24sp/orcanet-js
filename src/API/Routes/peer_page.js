import express from 'express';

const peer = express.Router();

peer.get('/get-peer', async (req, res) => {
    let statusCode = 200;
    let message = '';
    const { param1, param2 } = req.body;
    try {
       message = 'Message'
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

peer.get('/get-peers', async (req, res) => {
    let statusCode = 200;
    let message = '';
    const { param1, param2 } = req.body;
    try {
       message = 'Message'
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

peer.get('/remove-peer', async (req, res) => {
    let statusCode = 200;
    let message = '';
    const { param1, param2 } = req.body;
    try {
       message = 'Message'
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

export default peer;