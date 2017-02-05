// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const Connection = require('./core/io/Connection.js');

const UserInputBar = require('./ui/inputBar.js');
const OutputWindow = require('./ui/outputWindow.js');

let inputBar = new UserInputBar();
let outputWindow = new OutputWindow();


let params = {

    // 1. Legends of the Jedi
    //host : '204.209.44.23',
    //port : 5656
        // ERROR: Connection Refused??

    // 2. Aardwolf
    host : '23.111.136.202',
    port : 23,
        // WILL 86
        // WILL 85
        // WILL 102
        // WILL 200
        // WILL 201
        // DO 102
        // DO 24
        // DO 31
        // ip.src eq 66.228.127.34 or ip.dst eq 66.228.127.34

    //3. Armageddon
    //host : '206.72.201.199',
    //port : 4050,
        //DO 31
        //WILL 70

    //4. SlothMUD
    //host : '209.139.208.65',
    //port : 6101
        //Connection timed out?

    // Dark and Shattered Lands
    //host : '184.172.132.194',
    //port : 4000

};

const connection = new Connection(params);
connection.connect();


