import { recievedPayment, getPublicMultiaddr } from './utils.js';
import { multiaddr } from 'multiaddr'
import { Consumer } from '../Producer_Consumer/consumer.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'node:fs';
import crypto from 'crypto';
import { Producer } from '../Producer_Consumer/producer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const producerFilesPath = join(__dirname, '..', 'testProducerFiles');


export function hashFile(fileName) {
    const filePath = join(producerFilesPath, fileName);
    const fileContent = fs.readFileSync(filePath);
    const fileHash = crypto.createHash('sha256').update(fileContent).digest('hex');
    console.log('Filehash: ', fileHash);
}

export async function registerFile(fileName, uId, uName, uIp, uPort, price){
    const fileHash = hashFile(fileName);
    return new Promise((resolve, reject) => {
        let users = Producer.registerFile(fileHash, uId, uName, uIp, uPort, price);
        if (users !== false) resolve(users);
        else reject("Error in Producer.registerFile(). Check console.");
    });
}

export async function getProducers(fileHash) {
    return new Promise((resolve, reject) => {
        let users = Consumer.viewProducers(fileHash);
        if (users !== false) resolve(users);
        else reject("Error in Consumer.viewProducers(). Check console.");
    });
}