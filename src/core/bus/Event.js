


module.exports = class Event {

    constructor() {
        this._cancelled = false;
    }

    get cancelled() {
        return this._cancelled;
    }

    cancel() {
        this._cancelled = true;
    }

};