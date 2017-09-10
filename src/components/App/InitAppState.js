// State definitions of the components go first:
const LoginPage = {
    user:           null,
    redirectUrl:    null
};

// Then they merge into one
const INIT_APP_STATE = {
    LoginPage
};

export default INIT_APP_STATE;
