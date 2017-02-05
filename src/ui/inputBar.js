/**
 * Created by Logan on 2/4/2017.
 */

const EventBus = require('../core/bus/EventBus.js');
const EVENTS = EventBus.events;


// Eventually will move this into a component or something.


//TODO: Make this a setting at some point.
const CMDS_MAX_LENGTH = 25;

class CommandQueue {
    constructor() {
        this.commands = [];
        this.index = -1;
    }

    next() {
        // Allow index to max at commands.length, but not any higher so we don't over-inflate the index.
        if (this.index < this.commands.length) {
            this.index++;
        }

        if (this.index < this.commands.length) {
            return this.commands[this.index];
        } else {
            return "";
        }
    }

    previous() {
        // Allow index to go down to -1, but not any lower so we don't bury the index.
        if (this.index > -1) {
            this.index--;
        }

        if (this.index > -1) {
            return this.commands[this.index];
        } else {
            return "";
        }
    }

    add(cmd) {
        // Reset the queue and add the new command to the beginning of the array.
        this.reset();
        this.commands.unshift(cmd);

        // If we've exceeded our max length, remove commands from the end of the array.
        if (this.commands.length > CMDS_MAX_LENGTH) {
            this.commands.slice(CMDS_MAX_LENGTH);
        }
    }

    reset() {
        this.index = -1;
    }
}


const KEYS = {
    ENTER : 13,
    ARROW_UP : 38,
    ARROW_DOWN : 40
};

module.exports = class UserInputBar {

    constructor() {
        let that = this;

        this.eventBus = EventBus.getInstance();
        this.cmdQueue = new CommandQueue();
        this.inputTxt = document.getElementById("UserInputTxt");
        this.sendBtn = document.getElementById("UserInputSendBtn");


        this.sendBtn.onclick = function(evt) {
            that.handleSend();
        };

        this.inputTxt.onkeyup = function(evt) {
            console.log(evt);
            if (evt.keyCode === KEYS.ENTER) {

                that.handleSend();

            } else if(evt.keyCode === KEYS.ARROW_UP) {

                //TODO: Next command
                that.text = that.cmdQueue.next();

            } else if (evt.keyCode === KEYS.ARROW_DOWN) {

                // TODO: Previous command
                that.text = that.cmdQueue.previous();
            }
            //TODO: What should reset the command queue? Any non-arrow key? Only on enter? When the input gets cleared out??
        }

    }

    handleSend() {
        let text = this.text;
        let data = {
            originalText : text,
            currentText : text
        };

        this.cmdQueue.add(text);
        this.clearInput();

        this.eventBus.publish(EVENTS.USER_INPUT_RECIEVED, data);
    }

    get text() {
        return this.inputTxt.value;
    }

    set text(value) {
        console.log('set text : ' + value);
        this.inputTxt.value = value;
    }

    clearInput() {
        this.text = null;
    }

};
