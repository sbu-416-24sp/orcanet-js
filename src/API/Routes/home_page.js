import express from 'express';

const home = express.Router();

home.get('/get-file', async (req, res) => {
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

home.get('/get-file-info', async (req, res) => {
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

home.get('/upload-file', async (req, res) => {
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

home.get('/delete-file', async (req, res) => {
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

export default home;