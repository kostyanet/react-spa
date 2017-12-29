export default class Publisher {
    _subscribers = [];


    deliver(data) {
        this._subscribers.forEach((cb) => cb(data));
    }


    subscribe(cb) {
        if (typeof cb !== 'function') throw TypeError('Passed callback must be a function.');

        if (this._subscribers.indexOf(cb) < 0)
            this._subscribers.push(cb);
    }


    unsubscribe(cb) {
        this._subscribers.splice(this._subscribers.indexOf(cb), 1);
    }
}
