export default class StateAPI {

    static getValue(obj, path) {
        if (path === '' || typeof path === 'undefined') return obj;

        return path.split('.').reduce((currentValue, key, index) => {

            if (index > 0 && currentValue === undefined) {
                throw new Error(`Cannot extract value at path "${path}": "${key}" is not defined.`)
            }

            return currentValue[key]
        }, obj);
    }


    static setValue(target, updater, path = '') {
       return StateAPI._pathFinder(target, updater, path, StateAPI._setValue);
    }


    static mergeValue(target, updater, path = '') {
        return StateAPI._pathFinder(target, updater, path, StateAPI._mergeValue);
    }


    static _pathFinder(target, updater, path, updaterFunc) {
        if (typeof target !== 'object') throw TypeError('The target must be an object!');
        if (target === null) throw RangeError('The target cannot be null.');

        if (path === '') return Object.assign({}, updater);

        let value = target;

        path.split('.').forEach((key, index, _keys) => {
            if (index > 0 && typeof value !== 'object' && typeof value !== 'undefined') {
                throw new Error(`Cannot set value for non-object key "${key}" at path "${path}".`)

            } else if (!value[key])
                value[key] = {};

            if (index === _keys.length - 1) {
                value[key] = updaterFunc(value[key], updater);

            } else
                value = value[key];
        });

        return target;
    }


    static _setValue(value, updater) {
        if (StateAPI._isObject(updater))
            return Object.assign({}, updater);

        else if (Array.isArray(updater))
            return [].concat(updater);

        else return updater;
    }


    static _mergeValue(value, updater) {
        if (StateAPI._isObject(updater) && StateAPI._isObject(value))
            return Object.assign({}, value, updater);

        else if (StateAPI._isObject(updater))
            return Object.assign({}, updater);

        else if (Array.isArray(updater) && Array.isArray(value))
            return value.concat(updater);

        else if (Array.isArray(updater))
            return [].concat(updater);

        else return updater;
    }


    static _isObject(obj) {
        return typeof obj === 'object' && obj !== null && obj.toString() === '[object Object]'
    }


    // static warning() {
    //     console.warn('Current value and updater differ in their types.');
    // }

}