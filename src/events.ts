import { Dictionary } from "../node_modules/@browser-modules/typescript.dictionary/lib/dictionary.js";

export interface Listener {
    (...arg): void;
}

export type Listeners = Array<Listener>;

export class Event {
    public static defaultMaxListeners: number = 10;
    private _Events = new Dictionary<Listeners>();
    private _maxListeners: number = 10;
    public addListener(eventName: string, listener): Event {
        return this.on(eventName, listener);
    }
    public on(eventName: string, listener: Listener): Event {
        this._registerEvent(eventName, listener, false);
        return this;
    }
    public once(eventName: string, listener: Listener): Event {
        this._registerEvent(eventName, listener, true);
        return this;
    }
    public emit(eventName: string, ...args): boolean {
        let listeners = this._Events.get(eventName);
        let listenerCount = this.listenerCount(eventName);
        if (listeners) {
            listeners.map(listener => listener(...args));
        }
        return listenerCount === 0 ? false : true;
    }
    public eventNames(): string[] {
        return this._Events.keys();
    }
    public getMaxListeners(): number {
        return this._maxListeners === null ? Event.defaultMaxListeners : this._maxListeners;
    }
    public setMaxListeners(limit: number): Event {
        this._maxListeners = limit;
        return this;
    }
    public listeners(eventName: string) {
        return this._Events.get(eventName);
    }
    public listenerCount(eventName: string): number {
        let event = this._Events.get(eventName);
        return event === undefined ? 0 : event.length;
    }
    public removeAllListeners(eventNames?: Array<string>): Event {
        if (!eventNames) {
            eventNames = this._Events.keys();
        }
        eventNames.forEach(eventName => this._Events.remove(eventName));
        return this;
    }
    public removeListener(eventName: string, listener: Listener): Event {
            let listeners = this.listeners(eventName).filter( item => item === listener);
            this._Events.add(eventName, listeners);
        return this;
    }
    private _registerEvent(eventName: string, listener: Listener, type: boolean): void {
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
    private _createListeners(listener: Listener, listeners?: Listeners): Listeners {
        if (!listeners) {
            listeners = new Array<Listener>();
        }
        listeners.push(listener);
        return listeners;
    }
    private _createOnceListener(listener: Listener, eventName: string): Listener {
        let newListener = (...args) => {
            this.removeListener(eventName, listener);
            return listener(...args);
        };
        return newListener;
    }
    private _ListenerLimitReached(eventName: string): boolean {
        return this.listenerCount(eventName) === this.getMaxListeners() ? true : false;
    }
}

export default Event;
