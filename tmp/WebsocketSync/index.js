var WebSocketServer = require('websocket').server;
var http = require('http');
require('./prepare');

function formatDate(time) {
    var date = new Date(time);
    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes();
    var newTime = year + '-' + month + '-' + day + '-' + hour + '-' + min;
    return newTime;
}

const log4js = require("log4js");
log4js.configure({
    appenders: {
        WS: { type: "file", filename: "./plugins/WebsocketSync/logs/" + formatDate(new Date()) + ".log" },
        out: { type: "stdout", layout: { type: "basic" } }
    },
    categories: { default: { appenders: ["WS", 'out'], level: "debug" } },
});

const logger = log4js.getLogger("WS");

var server = http.createServer(function (request, response) {
    logger.info(' 获取请求： ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function () {
    logger.info(' 服务器正在 8080 端口运行');
});

const wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    logger.info('从', origin, '接收到连接请求');
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

const Clients = [];

function splitIP(ip){
    if (ip.substr(0, 7) == "::ffff:") {
      ip = ip.substr(7)
    }    
    return ip;
}

wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        logger.info(' 来自 ' + request.origin + ' 的连接被拒绝');
        return;
    }
    var connection = request.accept();
    let address = splitIP(connection.socket.remoteAddress);
    logger.info('与 '+address+' 的连接开启.');
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('收到的消息: ' + message.utf8Data);
            connection.sendUTF(JSON.stringify({ rec: message.utf8Data }));
        }
        else if (message.type === 'binary') {
            console.log('收到的二进制消息 ' + message.binaryData.length + ' 字节');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log(' Peer ' + connection.remoteAddress + ' 关闭了连接.');
    });
});

function broadcast(msg){
    Clients.forEach(c=>{
        c.sendUTF(msg);
    });
}

module.exports = {broadcast};