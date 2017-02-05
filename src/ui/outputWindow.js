/**
 * Created by Logan on 2/5/2017.
 */


const EventBus = require('../core/bus/EventBus.js');
const EVENTS = EventBus.events;


class ScreenQueue {
    constructor() {



    }



};




module.exports = class OutputWindow {

    constructor() {
        let that = this;

        this.eventBus = EventBus.getInstance();
        this.screenQueue = new ScreenQueue();
        this.window = document.getElementById("OutputWindow");


        this.eventBus.subscribe(EVENTS.SERVER_DATA_RECIEVED, 300, function(event){

            //TODO: Eventually, we'll need to REMOVE lines from the screen as well.

            let lines = event.currentData.split(/\r?\n/);

            for (let i = 0; i < lines.length; i++) {
                that.appendLine(lines[i]);
            }
        });

    }

    appendLine(line) {
        let pEl = document.createElement('p');
        let txtNode = document.createTextNode(line);
        pEl.appendChild(txtNode);

        this.window.appendChild(pEl);
    }



};