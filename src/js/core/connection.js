
const Socket = require('net').Socket;
const TelnetInput = require('telnet-stream').TelnetInput;


module.exports = class Connection {
    constructor(params) {
        this.params = params;
        let telnetIn = this.telnetIn = new TelnetInput();
        let socket = this.socket = new Socket();




        // TODO: When code is more stable, clean these up or relegate them to debugging logs.
        socket.on('timeout', () => { console.log('socket on timeout'); });
        socket.on('error', (error) => { console.log('socket on error'); console.log(error); });
        socket.on('close', () => { console.log('socket on close'); });
        socket.on('end', () => { console.log('socket on end'); });

        telnetIn.on('do', function(option) { console.log('telnet received DO ' + option); });
        telnetIn.on('dont', function(option) { console.log('telnetIn received DONT ' + option); });
        telnetIn.on('sub', function(option) { console.log('telnet received SUB ' + option); });
        telnetIn.on('will', function(option) { console.log('telnet received WILL ' + option); });
        telnetIn.on('wont', function(option) { console.log('telnet received WONT ' + option);});
        telnetIn.on('command', function(command) { console.log('telnet received COMMAND ' + command); });
    }

    connect() {
        let socket = this.socket;
        let telnetIn = this.telnetIn;
        let that = this;

        socket.connect(this.params, () => {
            console.log('socket connected to ' + this.params.host + ':' + this.params.port);

            // When data is spread across multiple packets, this will collect them all
            // before passing them to the telnetIn.on('data') handler.
            socket.pipe(telnetIn).pipe(process.stdout);


            telnetIn.on('data', (data) => {
                console.log('telnet on data');
                console.log(data.toString());
            });


            setTimeout(() => {
                that.write("Grognak");
            }, 2000);
        });
    }

    write(line) {
        console.log('writing : "' + line + '"');

        //TODO: Depending on the size of the command being sent, we might really want/need a buffer here.


        this.socket.write(line + '\n');
    }

};


// process.stdin.pipe(telnetOutput,{end : false}).pipe(socket); //TODO: report this bug to telnet-stream repo.