import { createGrpcClient } from '../Market/market.js'
import fs from 'fs';
import * as path from 'path';

const market = createGrpcClient();

// Can just call Producer.(method they want)
// ex: Producer.registerFile("lsfli3394ljfdsj")
export class Producer {
    /*
        Description:
            Tells the market we have this file and are willing to serve it for [bid]
        Parameters: 
            [String] hash -> the hash of the file you want to upload
            [Number] bid -> orcacoin producer wants in exchange
            [String] path -> absolute path of file producer wants to upload
        Returns:
            [true] on successful registration
            [false] otherwise
    */
    static registerFile(hash, uid, uname, uip, uport, uprice) {
        const newUser = {
            id: uid,
            name: uname,
            ip: uip,
            port: uport,
            price: uprice
        };
        const args = {
            user: newUser,
            fileHash: hash
        };

        market.registerFile(args, (error, response) => {
            if (error) {
                console.error('Error during []:', error);
                return false;
            } else {
                console.log('File registered successfully: ', hash);
    
                // might need to format the response
                // (need market methods to finalize first)
    
                // Add file to directory so that we can serve it on our server
                // const destinationDirectory = './http_server_files';
                // const originalFileName = path.basename(sourcePath);
                // const destinationPath = path.join(destinationDirectory, originalFileName);
                // fs.copyFileSync(sourcePath, destinationPath);
    
                return true;
            }
        });

        // const keyEncoded = new TextEncoder('utf8').encode(hash);
        // const userInfo = `${newUser.id}/${newUser.name}/${newUser.ip}/${newUser.port}/${newUser.price}`;
        // const valueEncoded = new TextEncoder('utf8').encode(userInfo);

        // try {
        //     console.log(`node Id checking: ${node.peerId}`);

        //     let existingUserStr;
        //     // const exist = await node.contentRouting.get(keyEncoded);
        //     const exist = node.services.dht.get(keyEncoded);
        //     for await (const queryEvent of exist) {
        //         // Handle each query event
        //         // console.log('Query event:', queryEvent);
        //         existingUserStr = new TextDecoder('utf8').decode(queryEvent.value);
        //     }
        //     console.log("exist value is "+ existingUserStr);

        //     // const existingUserStr = new TextDecoder('utf8').decode(exist);
        //     const values = existingUserStr.split('/');
        //     if (values[0] == '' || values[0] == undefined) {
        //         console.log("First time to upload the file from if");
        //         // await node.contentRouting.put(keyEncoded, valueEncoded);
        //         const putv = node.services.dht.put(keyEncoded, valueEncoded);
        //         for await (const queryEvent of putv) {
        //             // Handle each query event
        //             // console.log('Query event from put(): ', queryEvent);
        //             const message = new TextDecoder('utf8').decode(queryEvent.value);
        //             console.log("value of each qeury is ", message);
        //         }
        //         callRegisterFile(args);
        //     }

        //     // Same User
        //     else {
        //         console.log("The File already exist");
        //         console.log(`value: ${values[0]}`);
        //         console.log(`node Id: ${node.peerId}`);
        //         if (values[0] == node.peerId) {
        //             console.log("Same User try to upload existing file");
        //             if (values[3] == newUser.price) {
        //                 console.log("You already uploaded same file with the same price");
        //             }
        //             else {
        //                 // change the price in new User. Need to Update User value.
        //             }
        //         }
                
        //         // Different User
        //         else {
        //             const newValue = existingUserStr+"\n"+userInfo;
        //             const newValueEncoded = new TextEncoder('utf8').encode(newValue);
        //             // await node.contentRouting.put(keyEncoded, newValueEncoded);
        //             const putv = node.services.dht.put(keyEncoded, newValueEncoded);
        //             for await (const queryEvent of putv) {
        //                 // Handle each query event
        //                 // console.log('Query event from put(): ', queryEvent);
        //                 const message = new TextDecoder('utf8').decode(queryEvent.value);
        //                 console.log("value of each qeury is ", message);
        //             }
        //             callRegisterFile(args);
        //         }
        //     }
            
        // }
        // catch (error) {
        //     console.log("First time to upload the file from err");
        //     // const hi = await node.contentRouting.put(keyEncoded, valueEncoded);
        //     const putv = node.services.dht.put(keyEncoded, valueEncoded);
        //     for await (const queryEvent of putv) {
        //         // Handle each query event
        //         // console.log('Query event from put(): ', queryEvent);
        //         const message = new TextDecoder('utf8').decode(queryEvent.value);
        //         console.log("value of each qeury is ", message);
        //     }
        //     callRegisterFile(args);
        // }
        // node.services.dht.refreshRoutingTable();

        
        
        // const value = node.services.dht.get(keyEncoded);
        // for await (const queryEvent of value) {
        //     // Handle each query event
        //     // console.log('Query event from get():', queryEvent);
        //     const message = new TextDecoder('utf8').decode(queryEvent.value);
        //     console.log("value of each qeury is ", message);
        // }


        
    }

    /*
        Description:
            abc
        Parameters:
            abc
        Returns:
            abc
    */
    // static template(args) {
    //     const args = {
    //         abc: abc,
    //     };

    //     market.insertMarketMethodHere(args, (error, response) => {
    //         if (error) {
    //             console.error('Error during []:', error);
    //             return false;
    //         } else {
    //             console.log('success message:', response);

    //             // might need to format the response

    //             return true;
    //         }
    //     });
    // }
}
