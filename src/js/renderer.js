// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const Connection = require('./core/io.js').Connection;


console.log('renderer.js');

let params = {
    //Testing with something called ZombieMUD
    host : '206.72.201.199',
    port : 4050,
    //shellPrompt: '/ # ',
    debug : true,
    timeout : 15 * 60 * 1000,

    username : null,
    password : null
};

const connection = new Connection(params);
connection.connect();