/**
 * eMud will use a custom priority-based event bus to tie the different components and processes together.
 *
 * The priority of an event handler should be expressed as a number between 100 and 599. The ultimate goal of
 * the priority queue will be to put as little time as possible between event triggering and event fulfillment
 * by relegating some of the work until AFTER the event has been fulfilled.
 *
 * "Fulfillment" is the point at which the external actors are aware of the event. For example, if the event
 * is that 'user input was received', then fulfillment would be sending the input to the MUD server. If the
 * event was 'data recieved from server', then fulfillment would mean displaying the data on screen for the
 * user.
 *
 * Event priority guidelines are as follows:
 * 100     : Event occurs.
 * 101-199 : Immediate event processing. Any processing that could cancel an event from being fulfilled as
 *           triggered should happen here. (E.g., user sends input which is determined to be an alias.)
 * 200-299 : Pre-fulfillment processing. Any processing that must be done before the event is fulfilled.
 *           (E.g., user sends input and we want to scan it to see if it contains any variables that need
 *              swapped out.)
 * 300     : Event fulfillment. (E.g., user input is sent off to the server.
 * 301-399 : Post-fulfillment processing. Any processing that must be done immediately after event is fulfilled.
 *           (E.g., data from server has been written to the screen and we want to scan it to see if it should
 *              set off any user-defined triggers.)
 * 400-499 : Delayed processing. Any processing done on an event that isn't time sensitive. (E.g., logging.)
 */




// Using a singleton pattern to ensure there's only one command bus in the app.
const singleton = Symbol();
const uniqueToken = Symbol();

const events = {
    USER_INPUT_RECIEVED : 'user.input.recieved',
    SERVER_DATA_RECIEVED : 'server.data.recieved'
};


module.exports = class Bus {

    constructor(token) {
        if (token !== uniqueToken) {
            throw "Cannot construct singleton";
        }
        this.subscriptions = {};
    }


    static getInstance() {
        if (!this[singleton]) {
            this[singleton] = new Bus(uniqueToken);
        }
        return this[singleton];
    }

    static get events() {
        return events;
    }

    publish(event, data) {
        let subscribers = this.subscriptions[event];
        if (!subscribers) {
            return;
        }
        let keys = Object.keys(subscribers);
        for (let i = 0; i < keys.length; i++) {
            subscribers[keys[i]](data);
        }
    }

    subscribe(event, priority, callback) {
        if (!this.subscriptions[event]) {
            this.subscriptions[event] = [];
        }
        if (!this.subscriptions[event][priority]) {
            this.subscriptions[event][priority] = callback;
        } else {
            //TODO: Handle this better.
            console.log('Error: Subscription already exists for event "' + event + '" priority ' + priority);
        }
    }

};