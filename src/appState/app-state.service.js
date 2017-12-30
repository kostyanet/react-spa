import createBrowserHistory from 'history/createBrowserHistory'

import INIT_APP_STATE       from './InitAppState.js';
import Publisher            from './publisher.class.js';


const history = createBrowserHistory();


class AppStateService {

    constructor() {
        if (!AppStateService.instance) {
            this._state = INIT_APP_STATE || {};
            this._publisher = new Publisher();

            AppStateService.instance = this;
        }

        return AppStateService.instance;
    }


    get appState() {
        return Object.assign({}, this._state);
    }


    get appHistory() { return history; }


    subscribe(cb) {
        return this._publisher.subscribe(cb);
    }


    unsubscribe(cb) {
        return this._publisher.unsubscribe(cb);
    }


    mergeAppState = (updater = {}, callback) => {
        if (typeof updater !== 'object' && typeof updater !== 'function') {
            throw new TypeError('Unexpected type of partial state.');
        }

        this._state = Object.assign({}, this._state, updater);
        this._publisher.deliver(this.appState);

        this._state.debug && window.console.log('AppState: ', JSON.stringify(this._state, null, 2));

        if (typeof callback === 'function') {
            callback();

        } else if (typeof callback !== 'undefined') {
            throw TypeError('Callback is not a function.');
        }
    };


    initAppState() {
        this.mergeAppState();
        this.initAppState = null;

        INIT_APP_STATE.debug && window.console.log('AppState: init');
    }
}


const instance = new AppStateService();

export default instance;
