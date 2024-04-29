import express from 'express';
import { Settings } from '../../Database/db.js';

const settings = express.Router();

settings.put('/set-transfer-settings', async (req, res) => {
    let statusCode = 200;
    let message = '';
    const { theme, server } = req.body;
    try {
       message = 'Success';
       let json = {
        theme: theme,
        server: server
       }
       await Settings.createTable();
       await Settings.updateRow(json);
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

settings.get('/get-transfer-settings', async (req, res) => {
    let statusCode = 200;
    let message = '';
    try {
       let json = {}; // empty cause we just need to get the single row
       await Settings.createTable();
       message = await Settings.query(json);
       message = message[0];
    } catch (error) {
        statusCode = 500;
        message = "Error";
    }

    res.status(statusCode).send(message);
});

export default settings;