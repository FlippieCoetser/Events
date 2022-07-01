export interface Listener {
    (...arg: any[]): void;
}
export declare type Listeners = Array<Listener>;
export declare class Event {
    static defaultMaxListeners: number;
    private _Events;
    private _maxListeners;
    addListener: (eventName: string, listener: any) => Event;
    off: (eventName: string, listener: Listener) => Event;
    on: (eventName: string, listener: Listener) => Event;
    once: (eventName: string, listener: Listener) => Event;
    private _invokeListeners;
    emit: (eventName: string, ...args: any[]) => boolean;
    eventNames: () => string[];
    getMaxListeners: () => number;
    setMaxListeners: (limit: number) => Event;
    listeners: (eventName: string) => any;
    listenerCount: (eventName: string) => number;
    removeAllListeners: (eventNames?: Array<string>) => Event;
    removeListeners: (eventNames: Array<string>) => void;
    removeListener: (eventName: string, listener: Listener) => Event;
    private _registerEvent;
    private _createListeners;
    private _createOnceListener;
    private _ListenerLimitReached;
}
export default Event;
