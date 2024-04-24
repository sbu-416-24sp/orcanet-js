import express from 'express';
import { Consumer } from '../../Producer_Consumer/consumer.js';
import { sendRequestFile } from '../../Producer_Consumer/http_client.js';
import { jobs } from '../../Libp2p/utils.js';

const market = express.Router();

let producerPeers = [];     // { peerId : [Peer]}

market.put('/remove-from-history', async (req, res) => {
    let statusCode = 200;
    let message = 'Success';
    const { jobID } = req.query;
    try {
        delete jobs[jobID];
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

market.put('/clear-history', async (req, res) => {
    let statusCode = 200;
    let message = '';
    try {
       jobs = {}
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

market.get('/find-peer', async (req, res) => {
    let statusCode = 200;
    let message = 'Success';
    const { fileHash } = req.query;

    try {
        const producers = await Consumer.viewProducers(fileHash);
        message = producers
        for (const peer of producers) {
            peer['fileHash'] = fileHash
            peer['price'] = parseInt(peer['price'])
            if (!producerPeers.hasOwnProperty(peer['id'])) {producerPeers[peer['id']] = []}
            producerPeers[peer['id']].push(peer)
        }
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }
    res.status(statusCode).send(message);
});

market.put('/add-job', async (req, res) => {
    let statusCode = 200;
    let message = 'Success';
    const { fileHash, peerID } = req.body;
    const node = req.node;

    try {
        for (const fileInfo of producerPeers[peerID]) {
            if (fileInfo['fileHash'] == fileHash) {
                const jobId = peerID + fileHash;
                message = {jobId}
                jobs[jobId] = {
                    fileHash, 
                    peerID,
                    timeQueued: new Date().toISOString(),
                    status: 'active',
                    eta: 0,
                    accumulatedCost: 0,
                    accumulatedMemory: 0,
                    projectedCost: 0,
                    price: fileInfo['price'],
                    fileName: '',
                    fileSize: 0,
                }

                console.log(jobs, node.peerId.toString())
                
                const prodIp = fileInfo['ip']
                const prodPort = fileInfo['port']
                sendRequestFile(node.peerId.toString(), prodIp, prodPort, fileHash, jobId);
                break;
            }
        }

    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

market.get('/job-list', async (req, res) => {
    let statusCode = 200;
    let message = 'Success';

    try {
       message = {jobs}
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

market.get('/job-info', async (req, res) => {
    let statusCode = 200;
    let message = 'Success';
    const { jobID } = req.query;

    try {
        message = jobs[jobID]
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

market.get('/job-peer', async (req, res) => {
    let statusCode = 200;
    let message = '';
    const { jobID } = req.query;
    try {
        const peerID = jobs[jobID]['peerID'];
        const fileHash = jobs[jobID]['fileHash'];
        for (const peerInfo of producerPeers[peerID]) {
            if (peerInfo['fileHash'] == fileHash) {
                message = peerInfo
                break
            }
        }
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

market.put('/start-jobs', async (req, res) => {
    let statusCode = 200;
    let message = 'Success';
    const { jobIDs } = req.body;
    try {
       for (const jobID of jobIDs) {
            if (jobs[jobID]['status'] == 'paused') jobs[jobID]['status'] = 'active'
       }
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

market.put('/pause-jobs', async (req, res) => {
    let statusCode = 200;
    let message = 'Success';
    const { jobIDs } = req.body;
    try {
        for (const jobID of jobIDs) {
            if (jobs[jobID]['status'] == 'active') jobs[jobID]['status'] = 'paused'
       }
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

market.put('/terminate-jobs', async (req, res) => {
    let statusCode = 200;
    let message = 'Success';
    const { jobIDs } = req.body;
    try {
        for (const jobID of jobIDs) {
            if (jobs[jobID]['status'] != 'completed') jobs[jobID]['status'] = 'error'
       }
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});


export default market;