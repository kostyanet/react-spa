import StateAPI  from './state-api.class'


describe('setValue', () => {

    it('always returns an object', () => {
        expect(typeof StateAPI.setValue({})).toBe('object');
    });


    it('creates new nested objects', () => {
        let target = { model: {} };
        StateAPI.setValue(target, 'token==', 'model.user.session.token');

        expect(target.model.user.session.token).toBe('token==');
    });


    it('sets a null value', () => {
        let target = { model: {} };
        StateAPI.setValue(target, null, 'model.user.session.token');

        expect(target.model.user.session.token).toBeNull();
    });


    it('sets a numeric value', () => {
        let target = { model: {} };
        StateAPI.setValue(target, 5, 'model.user.session.token');

        expect(target.model.user.session.token).toBe(5);
    });


    it('throws if the target is null', () => {
        expect(() =>
            StateAPI.setValue(null, '', 'model.user.session')
        ).toThrow(/The target cannot be null/);
    });


    it('assigns a new nested object with desired keys-values',() => {
        let target = { model: {} };
        StateAPI.setValue(target, {token: 'token=='}, 'model.user.session');

        expect(target.model.user.session.token).toBe('token==');
    });


    it('preserves the root object, but reassigns a nested',() => {
        let target = {
            model: {
                user: {
                    session: {token: 'token=='}
                }
            }
        };
        let result = StateAPI.setValue(target, {ID: 'testID'}, 'model.user.session');

        expect(target === result).toBeTruthy();

        expect(target.model.user.session.token).not.toBeDefined();
        expect(target.model.user.session.ID).toBe('testID');
    });


    it('replaces a nested object with an array',() => {
        let target = {
            model: {
                user: {
                    session: {token: 'token=='}
                }
            }
        };

        StateAPI.setValue(target, [1, 2, 3], 'model.user.session');

        expect(JSON.stringify(target.model.user.session)).toEqual(JSON.stringify([1, 2, 3]));
    });


    it('throws if an intermediate value is not an object',() => {
        let target = { model: {user: 'some'} };

        expect(() =>
             StateAPI.setValue(target, {token: 'token=='}, 'model.user.session')
        ).toThrow();
    })

});


// ---------------------------------------------------------------------------------------


describe('mergeValue', () => {

    it('always returns an object', () => {
        expect(typeof StateAPI.mergeValue({})).toBe('object');
    });


    it('creates new nested objects', () => {
        let target = { model: {} };
        StateAPI.mergeValue(target, 'token==', 'model.user.session.token');

        expect(target.model.user.session.token).toBe('token==');
    });


    it('sets a null value', () => {
        let target = { model: {} };
        StateAPI.mergeValue(target, null, 'model.user.session.token');

        expect(target.model.user.session.token).toBeNull();
    });


    it('sets a numeric value', () => {
        let target = { model: {} };
        StateAPI.mergeValue(target, 5, 'model.user.session.token');

        expect(target.model.user.session.token).toBe(5);
    });


    it('throws if the target is null', () => {
        expect(() =>
            StateAPI.mergeValue(null, '', 'model.user.session')
        ).toThrow(/The target cannot be null/);
    });


    it('assigns a new nested object with desired keys-values',() => {
        let target = { model: {} };
        StateAPI.mergeValue(target, {token: 'token=='}, 'model.user.session');

        expect(target.model.user.session.token).toBe('token==');
    });


    it('preserves the root object',() => {
        let target = {
            model: {
                user: {
                    session: {token: 'token=='}
                }
            }
        };
        let result = StateAPI.mergeValue(target, {ID: 'testID'}, 'model.user.session');

        expect(target === result).toBeTruthy();
    });


    it('replaces a nested object, but preserves keys-values',() => {
        let target = {
            model: {
                user: {
                    session: {token: 'token=='}
                }
            }
        };

        StateAPI.mergeValue(target, {ID: 'testID'}, 'model.user.session');

        expect(target.model.user.session.token).toBe('token==');
        expect(target.model.user.session.ID).toBe('testID');
    });


    it('replaces a nested object with an array',() => {
        let target = {
            model: {
                user: {
                    session: {token: 'token=='}
                }
            }
        };

        let arr = [1, 2];

        StateAPI.mergeValue(target, arr, 'model.user.session');

        expect(JSON.stringify(target.model.user.session)).toEqual(JSON.stringify(arr));
    });


    it('replaces a nested array with an object',() => {
        let target = {
            model: {
                user: {
                    session: [1, 2]
                }
            }
        };

        let obj = {token: 'token=='};

        StateAPI.mergeValue(target, obj, 'model.user.session');

        expect(JSON.stringify(target.model.user.session)).toEqual(JSON.stringify(obj));
    });


    it('replaces a nested array, but preserves its items',() => {
        let target = {
            model: {
                user: {
                    rates: [1, 2, 3]
                }
            }
        };

        StateAPI.mergeValue(target, [1, 2], 'model.user.rates');

        expect(JSON.stringify(target.model.user.rates)).toEqual(JSON.stringify([1, 2, 3, 1, 2]));
    });


    it('throws if an intermediate value is not an object',() => {
        let target = { model: {user: 'some'} };

        expect(() =>
            StateAPI.mergeValue(target, {token: 'token=='}, 'model.user.session')
        ).toThrow();
    })

});

