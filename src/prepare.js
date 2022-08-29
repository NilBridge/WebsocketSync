const fs = require('fs');

/** 
* 生成一个GUID
* @returns GUID
*/
function GUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const example = {
    upload: {
        join: true,
        left: true,
        chat: true,
        die: true,
        bag: true,
        ender: true,
        armor: true,
        scoreboard: true
    },
    sync: {
        bag: true,
        ender: true,
        armor: true,
        scoreboard: true
    },
    bc: {
        join: true,
        chat: true,
        left: true,
        die: true,
        super: true
    },
    ws: {
        port: 8123,
        pwd: GUID(),
        re_connect: 5
    },
    logger: {
        level: 'debug'
    }
}

const lang = {
    upload: {
        join: '上传 {player} 进服数据',
        left: '上传 {player} 退服数据',
        chat: '上传 {player} 聊天数据',
        bag: '上传 {player} 背包数据',
        die: '上传 {player} 死亡数据',
        ender: '上传 {player} 末影箱数据',
        armor: '上传 {player} 盔甲数据',
        scoreboard: '上传 {player} 计分板数据'
    },
    bc: {
        join: '{player} 加入了 {server}',
        left: '{player} 离开了 {server}',
        chat: '[{server}] <{player}> {msg}',
        super: {
            transfer_at: {
                type: "cmd",
                run: ["execute \"{player}\" ~~~ title @s {msg}"]
            }
        }
    }
}

console.log(__dirname);

try {
    if (fs.existsSync('./plugins/WebsocketSync') == false) {
        fs.mkdirSync('./plugins/WebsocketSync');
        fs.mkdirSync('./plugins/WebsocketSync/logs');
        fs.writeFileSync("./plugins/WebsocketSync/config.json", JSON.stringify(example, null, 4));
        fs.writeFileSync("./plugins/WebsocketSync/lang.json", JSON.stringify(lang, null, 4));
    }
} catch (err) {
    console.log(err);
}
