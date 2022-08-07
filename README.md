# Events
Implementation of a Node.Events in Typescript compiled to an ES6 Browser Module

### Example
Open `./demo/index.html` by **right-click** on file in VS Code and select: **Open with Live Server**.  
The console output in chrome developer tools should display: `event emitted: eventIdentifier`.  

To reproduce this demo follow the steps below: 
1. After `npm install` make sure `./demo/index.html` contains importmap for dependencies:  
```html
<script type="importmap">
    {
        "imports": {
            "@browser-modules/dictionary": 
                "../node_modules/@browser-modules/dictionary/lib/dictionary.js",
            "@browser-modules/events": 
                "../node_modules/@browser-modules/dictionary/lib/events.js"
        }
    }
</script>
```
note: *importmaps make bare imports possible, see use case in step 4.*   

2. Add ES6 Modules in browser:

```html
<script src="index.js" type="module"></script>
```

3. Create `./demo/index.js` file
4. Import the module:  

```javascript
import { Event } from '@browser-modules/events';
```

5. Create emitter:  

```javascript
class Emitter extends Event {}
const emitter = new Emitter()
```

6. Register a listener:  

```javascript
emitter.on('event', event => 
    console.log(`event emitted: ${event}`)
)
```

7. Trigger event with eventIdentifier as argument:  

```javascript
emitter.emit('event','eventIdentifier')
```
