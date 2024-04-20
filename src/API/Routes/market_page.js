import express from 'express';

const market = express.Router();

market.patch('/remove-from-history', async (req, res) => {
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

market.patch('/clear-history', async (req, res) => {
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

market.put('/add-job', async (req, res) => {
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

market.get('/job-list', async (req, res) => {
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

market.patch('/job-info', async (req, res) => {
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

market.get('/job-peer', async (req, res) => {
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

market.put('/remove-from-history', async (req, res) => {
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


export default market;