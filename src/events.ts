import { Dictionary } from "@browser-modules/dictionary";

export interface Listener {
    (...arg): void;
}

export type Listeners = Array<Listener>;

export class Event {
    public static defaultMaxListeners: number = 10;
    private _Events = new Dictionary<Listeners>();
    private _maxListeners;
    public addListener = (eventName: string, listener): Event => 
        this.on(eventName, listener);
    
    public off = (eventName: string, listener: Listener): Event => 
        this.removeListener(eventName, listener);
    
    public on = (eventName: string, listener: Listener): Event => 
        this._registerEvent(eventName, listener, false);

    public once = (eventName: string, listener: Listener): Event => 
        this._registerEvent(eventName, listener, true);

    private _invokeListeners = (listeners, ...args) => 
        listeners && listeners.forEach(listener => listener(...args))

    public emit = (eventName: string, ...args): boolean => {
        this._invokeListeners(this._Events.get(eventName), ...args)
        return this.listenerCount(eventName) === 0 ? false : true;
    }
    public eventNames = (): string[] => this._Events.keys();
    
    public getMaxListeners = (): number => 
        !this._maxListeners ? Event.defaultMaxListeners : this._maxListeners;
        
    public setMaxListeners = (limit: number): Event => {
        this._maxListeners = limit;
        return this;
    }
    public listeners = (eventName: string) => this._Events.get(eventName);
    
    public listenerCount = (eventName: string): number => 
        this._Events.get(eventName) ? this._Events.get(eventName).length : 0  
    
    public removeAllListeners = (eventNames?: Array<string>): Event => {
        eventNames = eventNames ? eventNames : this._Events.keys()
        this.removeListeners(eventNames)
        return this;
    }
    public removeListeners = (eventNames: Array<string>) => 
        eventNames.forEach(eventName => this._Events.remove(eventName));

    public removeListener = (eventName: string, listener: Listener): Event => {
            let listeners = this.listeners(eventName).filter( item => item === listener);
            this._Events.add(eventName, listeners);
        return this;
    }

    private _registerEvent = (eventName: string, listener: Listener, type: boolean): Event => {
        let limitReached = this._ListenerLimitReached(eventName)
        if (limitReached) {
            console.log("Maximum listener reached, new Listener not added")
            return this
        }
                
        listener = type ? this._createOnceListener(listener, eventName) : listener
        
        let listeners = this._createListeners(listener, this.listeners(eventName))
        this._Events.add(eventName, listeners)
        return this
    }
    private _createListeners = (listener: Listener, listeners?: Listeners): Listeners => {
        listeners = listeners ? listeners:  (listeners = new Array<Listener>())
        listeners.push(listener);
        return listeners;
    }
    private _createOnceListener = (listener: Listener, eventName: string): Listener => 
        (...args) => {
            this.removeListener(eventName, listener);
            return listener(...args);
        };
    
    private _ListenerLimitReached = (eventName: string): boolean => 
        this.listenerCount(eventName) === this.getMaxListeners() ? true : false;
}

export default Event;
