/**
 * Created by specer on 15/5/20.
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var process = require('process');

var handle = {}
handle["/"] = requestHandlers.getPublicKey;
handle["/getPublicKey"] = requestHandlers.getPublicKey;
handle["/sign"] = requestHandlers.sign;

server.start(router.route, handle);

process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });
});
