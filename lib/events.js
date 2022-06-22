import { Dictionary } from "dictionary";
export class Event {
    constructor() {
        this._Events = new Dictionary();
        this._maxListeners = 10;
    }
    addListener(eventName, listener) {
        return this.on(eventName, listener);
    }
    on(eventName, listener) {
        this._registerEvent(eventName, listener, false);
        return this;
    }
    once(eventName, listener) {
        this._registerEvent(eventName, listener, true);
        return this;
    }
    emit(eventName, ...args) {
        let listeners = this._Events.get(eventName);
        let listenerCount = this.listenerCount(eventName);
        if (listeners) {
            listeners.map(listener => listener(...args));
        }
        return listenerCount === 0 ? false : true;
    }
    eventNames() {
        return this._Events.keys();
    }
    getMaxListeners() {
        return this._maxListeners === null ? Event.defaultMaxListeners : this._maxListeners;
    }
    setMaxListeners(limit) {
        this._maxListeners = limit;
        return this;
    }
    listeners(eventName) {
        return this._Events.get(eventName);
    }
    listenerCount(eventName) {
        let event = this._Events.get(eventName);
        return event === undefined ? 0 : event.length;
    }
    removeAllListeners(eventNames) {
        if (!eventNames) {
            eventNames = this._Events.keys();
        }
        eventNames.forEach(eventName => this._Events.remove(eventName));
        return this;
    }
    removeListener(eventName, listener) {
        let listeners = this.listeners(eventName).filter(item => item === listener);
        this._Events.add(eventName, listeners);
        return this;
    }
    _registerEvent(eventName, listener, type) {
        if (this._ListenerLimitReached(eventName)) {
            console.log("Maximum listener reached, new Listener not added");
            return;
        }
        if (type === true) {
            listener = this._createOnceListener(listener, eventName);
        }
        let listeners = this._createListeners(listener, this.listeners(eventName));
        this._Events.add(eventName, listeners);
        return;
    }
    _createListeners(listener, listeners) {
        if (!listeners) {
            listeners = new Array();
        }
        listeners.push(listener);
        return listeners;
    }
    _createOnceListener(listener, eventName) {
        let newListener = (...args) => {
            this.removeListener(eventName, listener);
            return listener(...args);
        };
        return newListener;
    }
    _ListenerLimitReached(eventName) {
        return this.listenerCount(eventName) === this.getMaxListeners() ? true : false;
    }
}
Event.defaultMaxListeners = 10;
export default Event;
