import { createGrpcClient } from '../Market/market.js'
import fs from 'fs';
import * as path from 'path';

const market = createGrpcClient();
// Can call Consumer.(method they want)
// ex: Consumer.viewProducers("lsfli3394ljfdsj")
export class Consumer {
    /*
        Description:
            Asks the market server to send all the producers currently serving the file.
        Parameters: 
            [String] hash -> the hash of the file you want
        Returns:
            [false] on query error
            [empty List] if no one is serving the file
            [List of producer IPs with their corresponding bid] otherwise

    */
    static viewProducers(hash) {
        const args = {
            fileHash : hash
        }

        market.checkHolders(args, (error, response) => {
            if (error) {
                console.error('Error: ', error);
                return false;
            } else {
                console.log('Producers for file', hash, ": ", response);
                var users = response.holders; // holders is a list of Users
                return users;
            }
        });
    }

    /*
        Description:
            Consumer downloads file, and finalizes transaction
        Parameters:
            [String] producerIP -> Public IP of producer
            [String] hash ->  Hash of the file
        Returns:
            [true] If consumer succesfully downloaded file
            [false] otherwise
    */
    static queryProducer(producerIP, hash) {
        const fileUrl = `http://${producerIP}/${hash}`;
        const destinationDirectory = './http_server_files';
        const fileName = path.basename(fileUrl);
        const destinationPath = path.join(destinationDirectory, fileName);

        http.get(fileUrl, (response) => {
            if (response.statusCode === 200) {
              const fileStream = fs.createWriteStream(destinationPath);
              response.pipe(fileStream);
              fileStream.on('finish', () => {
                fileStream.close();
                console.log(`File downloaded to ${destinationPath}`);
              });
              return true;
            } else {
              console.error(`Failed to download file. Status code: ${response.statusCode}`);
              return false;
            }
        });
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
