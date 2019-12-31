const SET_LOGING_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGING_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGING_ERROR = 'SET_LOGIN_ERROR';

//actions
function setLoginPending(isLoginPending) {
    return {
      type: SET_LOGING_PENDING,
      isLoginPending
    };
  }

function setLoginSuccess(isLoginSuccess) {
    return {
        type: SET_LOGING_SUCCESS,
        isLoginSuccess
    }
}

function setLoginError(isLoginError) {
    return {
        type: SET_LOGING_ERROR,
        isLoginError
    }
}

//simulating login request
function callLogin( email, password, callback ) {
    setTimeout(() => {
        if(email === 'ssk@gmail.com' && password === 'pass') {
            return callback(null);
        } else {
            return callback(new Error('Invalid Mail and Password'));
        }
    }, 1000);
}

//action to actual send login request and dispatch our actions
export function login( email, password ) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        callLogin( email, password, error => {
            dispatch(setLoginPending(false));
            if(!error) {
                dispatch(setLoginSuccess(true));
            } else {
                dispatch(setLoginError(error));
            }
        });
    }
}

//reducer
//state chaange logic
export default function reducer(state = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLoginError: null
}, action) {
    switch(action.type) {
        case SET_LOGING_PENDING:
            return Object.assign({}, state, {
                isLoginPending: action.isLoginPending
            });

        case SET_LOGING_SUCCESS:
            return Object.assign({}, state, {
                isLoginSuccess: action.isLoginSuccess
            });

        case SET_LOGING_ERROR:
            return Object.assign({}, state, {
                isLoginError: action.isLoginError
            });

        default:
            return state;
    }
}
