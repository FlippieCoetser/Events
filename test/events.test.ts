import Event from '../src/events.js'


describe("Given: Event", () => {
    it("When addListener(eventName, listener) then listeners(eventName) should eql listener", () => {
        let event = new Event();
        let listener = jasmine.createSpy('spy');
        let eventName = "eventName";
        event.addListener(eventName, listener);
        expect(event.listeners(eventName).length).toBe(1);
        expect(event.listeners(eventName)[0]).toBe(listener);
    });
    it("When Event available then defaultMaxListeners should be eql 10", () => {
        expect(Event.defaultMaxListeners).toBe(10);
    });
    it("When setMaxListeners(limit) then getMaxListeners() should eql to limit", () => {
        let event = new Event();
        let Limit = 5;
        event.setMaxListeners(Limit);
        expect(event.getMaxListeners()).toBe(Limit);
    });
    it("When setMaxListeners(limit) then instanceof should eql Event", () => {
        let event = new Event();
        expect(event.setMaxListeners(5) instanceof Event).toBe(true);
    });
    it("When listeners(eventName) after on(eventName, Listener) then listenerCount should eql ++ previous listenerCount", () => {
        let event = new Event();
        let listener = jasmine.createSpy('spy');
        let eventName = "eventName";
        expect(event.listenerCount(eventName)).toBe(0);
        event.on(eventName, listener);
        expect(event.listenerCount(eventName)).toBe(1);
    });
    describe("Given: on(eventName, listener)", () => {
        it("When calling listeners(eventName) then listeners[0] should eql listener", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let eventName = "eventName";
            event.on(eventName, listener);
            expect(event.listeners(eventName).length).toBe(1);
            expect(event.listeners(eventName)[0]).toBe(listener);
        });
        it("When emit(eventName) then emit should eql true", () => {
            let event = new Event();
            let listener = () => null;
            let eventName = "eventName";
            event.on(eventName, listener);
            expect(event.emit(eventName)).toBe(true);
        });
        it("When emit(eventName) then listener should be called", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let eventName = "eventName";
            event.on(eventName, listener);
            event.emit(eventName);
            expect(listener).toHaveBeenCalledTimes(1);
        });
        it("When emit(eventName, arg) then listener should be called with arg", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let eventName = "eventName";
            let arg = "agr";
            event.on(eventName, listener);
            event.emit(eventName, arg);
            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(arg);
        });
        it("When on(eventName, listener2) and emit(eventName) then listener1() and listener2() should be called ", () => {
            let event = new Event();
            let listenerOne = jasmine.createSpy('spy');
            let listenerTwo = jasmine.createSpy('spy');
            let eventName = "eventName";
            event.on(eventName, listenerOne);
            event.on(eventName, listenerTwo);
            event.emit(eventName);
            expect(listenerTwo).toHaveBeenCalledTimes(1);
            expect(listenerOne).toHaveBeenCalledTimes(1);
        });
        it("When eventNames() then eventNames should eql [eventName]", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let eventName = "eventName";
            expect(event.eventNames()).toEqual([]);
            event.on(eventName, listener);
            expect(event.eventNames()).toEqual([eventName]);
        });
        it("When listeners(eventName) then listeners should eql [listener]", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let eventName = "eventName";
            event.on(eventName, listener);
            expect(event.listeners(eventName)[0]).toBe(listener);
        });
        it("When removeAllListeners() then listeners should eql 0", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let eventName = "eventName";
            event.on(eventName, listener);
            expect(event.eventNames().length).toBe(1);
            event.removeAllListeners();
            expect(event.eventNames().length).toBe(0);
        });
        it("When removeAllListeners([eventName]) then listeners should not contain eventName", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let listener2 = jasmine.createSpy('spy');
            let eventName = "eventName";
            let eventName2 = "eventName2";
            event.on(eventName, listener);
            event.on(eventName2, listener2);
            expect(event.eventNames().length).toBe(2);
            event.removeAllListeners([eventName]);
            expect(event.eventNames().length).toBe(1);
        });
        describe("Given: on(eventName1, listener)", () => {
            it("When removeListener(eventName, listener) then listenerCount(eventName) should eql 1", () => {
                let event = new Event();
                let listenerOne = jasmine.createSpy('spy');
                let listenerTwo = jasmine.createSpy('spy');
                let eventName = "eventName";
                event.on(eventName, listenerOne);
                event.on(eventName, listenerTwo);
                expect(event.listenerCount(eventName)).toBe(2);
                event.removeListener(eventName, listenerOne);
                expect(event.listenerCount(eventName)).toBe(1);
            });
            it("When off(eventName, listener) then listenerCount(eventName) should eql 1", () => {
                let event = new Event();
                let listenerOne = jasmine.createSpy('spy');
                let listenerTwo = jasmine.createSpy('spy');
                let eventName = "eventName";
                event.on(eventName, listenerOne);
                event.on(eventName, listenerTwo);
                expect(event.listenerCount(eventName)).toBe(2);
                event.off(eventName, listenerOne);
                expect(event.listenerCount(eventName)).toBe(1);
            });
            it("When removeAllListeners([eventNames]) then event.eventNames should eql 0", () => {
                let event = new Event();
                let listener = jasmine.createSpy('spy');
                let eventName = "eventName";
                let eventNameTwo = "eventNameTwo";
                event.on(eventName, listener);
                event.on(eventNameTwo, listener);
                expect(event.eventNames().length).toBe(2);
                event.removeAllListeners(["eventName", "eventNameTwo"]);
                expect(event.eventNames().length).toBe(0);
        });
    });
});

    describe("Given: on(eventName, listener)!", () => {
        it("When emit(eventName) then emit should eql false", () => {
            let event = new Event();
            let eventName = "eventName";
            expect(event.emit(eventName)).toBe(false);
        });
    });
    describe("Given: once(eventName, listener)", () => {
        it("When emit(eventName, arg) then listener should be called with arg", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let eventName = "eventName";
            let arg = "agr";
            event.once(eventName, listener);
            event.emit(eventName, arg);
            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(arg);
        });
        it("When emit(eventName) and emit(eventName) then listener() should be called once", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let eventName = "eventName";
            event.once(eventName, listener);
            event.emit(eventName);
            event.emit(eventName);
            expect(listener).toHaveBeenCalledTimes(1);
        });
        it("When on(eventName2, listener2) and emit(eventName) and emit(eventName2) then listener2() should be called", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let eventName = "eventName";
            let listener2 = jasmine.createSpy('spy');
            let eventName2 = "eventName2";
            event.once(eventName, listener);
            event.on(eventName2, listener2);
            event.emit(eventName);
            event.emit(eventName2);
            expect(listener2).toHaveBeenCalledTimes(1);
        });
        it("When on(eventName2, listener2) and emit(eventName) and emit(eventName2) then listener() should be called", () => {
            let event = new Event();
            let listener = jasmine.createSpy('spy');
            let eventName = "eventName";
            let listener2 = jasmine.createSpy('spy');
            let eventName2 = "eventName2";
            event.once(eventName, listener);
            event.on(eventName2, listener2);
            event.emit(eventName);
            event.emit(eventName2);
            expect(listener).toHaveBeenCalledTimes(1);
        });
    });
    describe("Given: setMaxListners(limit)!", () => {
        it("When getMaxListeners() then getMaxListeners should eql 10", () => {
            let event = new Event();
            let Limit = Event.defaultMaxListeners;
            expect(event.getMaxListeners()).toBe(Limit);
        });
    });
    describe("Given: setMaxListeners(1)", () => {
        it("When on(eventName, listener) and on(eventName1, listener) then listenerCount(eventName) should return 1", () => {
            let event = new Event();
            event.setMaxListeners(1);
            let listenerOne = jasmine.createSpy('spy');
            let listenerTwo = jasmine.createSpy('spy');
            let eventName = "eventName";
            event.on(eventName, listenerOne);
            event.on(eventName, listenerTwo);
            expect(event.listenerCount(eventName)).toBe(1);
        });
    });
});
