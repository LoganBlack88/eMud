/**
 *
 */
const Telnet = require('telnet-client');


class Connection {
    constructor(params) {
        console.log('Connection constructor');
        this.params = params;
        this.connection = new Telnet();

        // Emitted when socket connection is established successfully.
        this.connection.on('connect', function(args) {
            console.log('telnet on connect');
            console.log(args);
        });

        // Emitted when a socket connection is successfully established with the remote host.
        this.connection.on('ready', function(prompt) {
            console.log('telnet on ready');
            console.log(prompt);
        });

        // Emitted when the write of given data is sent to the socket.
        this.connection.on('writedone', function(args){
            console.log('telnet on writedone');
            console.log(args);
        });

        // Emitted when socket receives data from the remote host.
        this.connection.on('data', function(buffer) {
            console.log('telnet on data');
            console.log(buffer);
        });

        // Emitted if the socket times out from inactivity.
        this.connection.on('timeout', function() {
            console.log('telnet on timeout');
        });

        this.connection.on('failedlogin', function() {
            console.log('telnet on failedlogin');
        });

        // Emitted when an error occurs. The 'close' event will be hit immediately after this.
        this.connection.on('error', function(errorMsg) {
            console.log('telnet on error : ' + errorMsg);
        });

        // Emitted when the remote host sends a FIN packet.
        this.connection.on('end', function(){
            console.log('telnet on end');
        });

        // Emitted once the socket is fully closed.
        this.connection.on('close', function() {
            console.log('telnet on close');
        });

    }

    connect() {
        console.log('Connection connect');
        console.log(this.connection);
        console.log(this.params);
        this.connection.connect(this.params);
    }

    send(data) {
        //TODO: ensure that we're connected first.
        this.connection.exec(data);
    }

}

exports.Connection = Connection;