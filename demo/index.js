import { Event } from '@browser-modules/events';

class Emitter extends Event {}
const emitter = new Emitter()

emitter.on('event', event => console.log(`event emitted: ${event}`))
emitter.emit('event','eventIdentifier')
