import express from 'express';
import {getProducers} from '../Wrappers/producer_consumer.js';

const peer = express.Router();

peer.get('/get-peer', async (req, res) => {
    let statusCode = 200;
    let message = '';
    const { peerID } = req.body;
    try {
        message = getProducers(peerID);
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

//return all peers
peer.get('/get-peers', async (req, res) => {
    let statusCode = 200;
    let message = '';
    const node = req.node;
    try {
       message = node.getPeers();
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});


//no implementation
peer.post('/remove-peer', async (req, res) => {
    let statusCode = 200;
    let message = '';
    const { peerID } = req.body;
    
    try {
       message = 'Message'
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

export default peer;