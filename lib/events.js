import { Dictionary } from "dictionary";
export class Event {
    constructor() {
        this._Events = new Dictionary();
        this._maxListeners = 10;
        this.addListener = (eventName, listener) => this.on(eventName, listener);
        this.off = (eventName, listener) => this.removeListener(eventName, listener);
        this.on = (eventName, listener) => this._registerEvent(eventName, listener, false);
        this.once = (eventName, listener) => this._registerEvent(eventName, listener, true);
        this._invokeListeners = (listeners, ...args) => listeners && listeners.forEach(listener => listener(...args));
        this.emit = (eventName, ...args) => {
            this._invokeListeners(this._Events.get(eventName), ...args);
            return this.listenerCount(eventName) === 0 ? false : true;
        };
        this.eventNames = () => this._Events.keys();
        this.getMaxListeners = () => this._maxListeners === null ? Event.defaultMaxListeners : this._maxListeners;
        this.setMaxListeners = (limit) => {
            this._maxListeners = limit;
            return this;
        };
        this.listeners = (eventName) => this._Events.get(eventName);
        this.listenerCount = (eventName) => this._Events.get(eventName) ? this._Events.get(eventName).length : 0;
        this.removeAllListeners = (eventNames) => {
            eventNames = eventNames ? eventNames : this._Events.keys();
            this.removeListeners(eventNames);
            return this;
        };
        this.removeListeners = (eventNames) => eventNames.forEach(eventName => this._Events.remove(eventName));
        this.removeListener = (eventName, listener) => {
            let listeners = this.listeners(eventName).filter(item => item === listener);
            this._Events.add(eventName, listeners);
            return this;
        };
        this._registerEvent = (eventName, listener, type) => {
            let limitReached = this._ListenerLimitReached(eventName);
            if (limitReached) {
                console.log("Maximum listener reached, new Listener not added");
                return this;
            }
            listener = type ? this._createOnceListener(listener, eventName) : listener;
            let listeners = this._createListeners(listener, this.listeners(eventName));
            this._Events.add(eventName, listeners);
            return this;
        };
        this._createListeners = (listener, listeners) => {
            listeners = listeners ? listeners : (listeners = new Array());
            listeners.push(listener);
            return listeners;
        };
        this._createOnceListener = (listener, eventName) => (...args) => {
            this.removeListener(eventName, listener);
            return listener(...args);
        };
        this._ListenerLimitReached = (eventName) => this.listenerCount(eventName) === this.getMaxListeners() ? true : false;
    }
}
Event.defaultMaxListeners = 10;
export default Event;
