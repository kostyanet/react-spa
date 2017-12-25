import INIT_APP_STATE       from './InitAppState.js';


class AppStateService {

    _callback = null;


    constructor() {
        if (!AppStateService.instance) {
            this._state = INIT_APP_STATE;

            AppStateService.instance = this;
        }

        return AppStateService.instance;
    }


    get appState() {
        return Object.assign({}, this._state);
    }


    subscribe(cb) {
        this._callback = cb;
        this._initAppState();
    }


    mergeAppState(updater, callback) {
        if (typeof updater !== 'object' && typeof updater !== 'function' && typeof updater !== null) {
            throw new TypeError('Unexpected type of partial state.');
        }

        if (callback && typeof callback !== 'function') {
            throw new TypeError('Callback is not a function.');
        }

        this._state = Object.assign({}, this._state, updater);
        this._callback(this.appState, callback);
    }


    _initAppState() {
        this.mergeAppState({init: 'done'});
        this._initAppState = null;
    }
}


const instance = new AppStateService();
// Object.freeze(instance);


export default instance;


// class State {
//     constructor() {
//
//     }
// }
