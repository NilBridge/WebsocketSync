
// server.js

const { Server } = require("@hapi/hapi")

/**
 * 
 * @param {Server} server 
 */
module.exports = (server) =>{
    server.route({
        path: '/api/welcome',
        method: 'GET',
        handler () {
            return {
                code: 200,
                success: true,
                data: {
                    msg: 'welcome! '
                }
            }
        }
    })
}
