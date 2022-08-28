'use strict';
const fs = require('fs');
const path = require("path");
const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    let files = fs.readdirSync(path.join(__dirname,'route'));
    for(let i in files){
        try{
            require(path.join(__dirname,'route',files[i]))(server);
        }catch(err){
            console.log(err);
        }
    }
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
});

init();