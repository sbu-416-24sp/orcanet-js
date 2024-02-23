var PROTO_PATH = '../protos/peernode.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var peer_proto = grpc.loadPackageDefinition(packageDefinition).peernode;

function main() { // listening
    
}