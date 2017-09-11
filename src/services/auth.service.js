// Authorization service
// Makes POST to log in, saves into LocalStorage



class AuthService {
    constructor(url) {
        this.url = url;
        if (!AuthService.instance) {
            this._data = { isLogged: false };
            AuthService.instance = this;
        }

        return AuthService.instance;
    }

    // the getter&setter
    // allow the components to interact via LoginService
    get isLogged() {
        return this._data.isLogged;
    }

    set isLogged(value) {
        this._data.isLogged = value;
    }


    login(credsObj) {
        const query = [JSON.stringify(credsObj), this.url];
        return _fetch(...query)
            // parsing & analyzing the server's response
            .then(response => JSON.parse(response))
            .then(data => {
                console.log(data);
                this.isLogged =  (data['Auth'] == 'Logged')
                return this.isLogged; // setting the logged state
            })
            .catch(err => { throw new Error(err.status + ': ' + err.message) });
    }
}

const url = 'http://localhost:3000/login';
// manipulations for the singleton and its safety
const instance = new AuthService(url);
Object.freeze(instance);

export default instance;