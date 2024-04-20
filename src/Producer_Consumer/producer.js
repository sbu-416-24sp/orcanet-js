import { createGrpcClient } from '../Market/market.js'
const market = createGrpcClient();

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
    
                // Add file to directory so that we can serve it on our server
                // const destinationDirectory = './http_server_files';
                // const originalFileName = path.basename(sourcePath);
                // const destinationPath = path.join(destinationDirectory, originalFileName);
                // fs.copyFileSync(sourcePath, destinationPath);
    
                return true;
            }
        });
    }
}
