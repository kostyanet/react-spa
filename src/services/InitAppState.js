import createBrowserHistory from 'history/createBrowserHistory'

// State definitions of the components go first:
// const LoginPage = {
//     user:           null,
//     redirectUrl:    'opa'
// };

// Then they merge into one
const INIT_APP_STATE = {
    model:      null,
    view:       null,
    history:    createBrowserHistory()
};

export default INIT_APP_STATE;
