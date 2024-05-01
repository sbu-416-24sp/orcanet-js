# Orcanet-JS

## Installation
Note: Need bash pre installed in order for coin process to work
```
git clone https://github.com/sbu-416-24sp/orcanet-js.git
cd orcanet-js
git submodule update --init --recursive
cd src/416_Orcacoin-JS/
npm rebuild
cd ../
npm install
```
## How to run
```
cd src
node index.js
```
## Setup (optional)
Go to src/.env.

To change default ports (optional):

```
NODE_PORT=3000
HTTP_PORT=4000          // HTTP SERVER FOR FILE EXCHANGE
GRPC_PORT=5000          // FOR NODE - MARKET COMMUNICATION
API_PORT=6000           // HTTP API FOR GUI
```
To run multiple local nodes, required to change NODE_PORT and GRPC_PORT for each.

To run node as a DHT client or server modify DHT_MODE:
```
DHT_MODE="SERVER"       // or "CLIENT"
```
To add a bootstrap multiaddress, set BOOTSTRAP_MULTI:
```
BOOTSTRAP_MULTI="/ip4/72.229.181.210/tcp/5555/p2p12D3KooWFQ8XWQPfjVUPFkvkLY6R8snUQDgFshV1Fvobq7qHk88W"
```

## HTTP API For GUI
### Market Page
* PUT /remove-from-history
* PUT /clear-history
* GET /get-history (INCOMPLETE)
* GET /find-peer
* PUT /add-job
* GET /job-list
* GET /job-info
* GET /job-peer
* PUT /start-jobs
* PUT /pause-jobs
* PUT /terminate-jobs
### Home Page
* GET /file/:hash/info
* POST /upload
* DELETE /file/:hash
### Peer Page
* GET /get-peer
* GET /get-peers
* POST /remove-peer
### Stats Page
* GET /stats/network
* GET /types
* GET /activity
### Wallet Page
* GET /wallet/balance
* GET /wallet/revenue/:type
* GET /wallet/transactions/latest
* GET /wallet/transactions/complete
* POST /wallet/transfer
### Mining Page (In progress)

## TODO
1. Libp2p Holepunching to fix NAT issue and allow private nodes to act as producers 
2. Mining page endoints
3. Coin/wallet process working locally without VM 