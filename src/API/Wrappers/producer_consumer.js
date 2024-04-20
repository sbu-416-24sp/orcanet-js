// Source functions
import { Producer } from '../../Producer_Consumer/producer.js';
import { Consumer } from '../../Producer_Consumer/consumer.js';

// Helper functions
import { hashFile } from '../../Libp2p/utils.js';

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