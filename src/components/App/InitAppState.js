// State definitions of the components go first:
const LoginPage = {
    nameMsg:    '',
    nameValue:  '',
    passMsg:    '',
    passValue:  '',
    status:     'init'
};

// Then they merge into one
const INIT_APP_STATE = {
    LoginPage
};

export default INIT_APP_STATE;
