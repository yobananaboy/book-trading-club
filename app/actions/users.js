import axios from 'axios';
const getUserUrl = '/getUser';
const updateUrl = '/updateUser';
const signupUrl = '/usersignup';
const loginUrl = '/userlogin';
const logoutUrl = '/userlogout';

export const checkUserLoggedIn = () => {
    return (dispatch) => {
        axios.get(getUserUrl)   
            .then(res => {
                if(res.data.user) {
                    dispatch(userUpdated(res.data.user));    
                }
                else {
                    dispatch(userUpdated(false));
                }
            })
            .then(err => {
                if(err) {
                    dispatch(userUpdated(false));
                }
            });
    }; 
};

export const updateUser = (user) => {
    return (dispatch) => {
        axios.post(updateUrl, user)
            .then(res => {
                if(res.data.success) {
                    dispatch(updateUserMessage('User settings updated'));
                }
            })
            .then(err => {
                if(err) {
                    console.log(err);
                    dispatch(updateUserMessage('Could not update user settings. Please try again.'));
                }
            });
    };
};

export const signup = (user) => {
    return(dispatch) => {
        axios.post(signupUrl, user)
            .then(res => {
                if(res.data.success) {
                    dispatch(checkUserLoggedIn());
                }
                if(res.data.err) {
                    dispatch(updateUserMessage(res.data.message));
                }
            })
            .then(err => {
                if(err) {
                    dispatch(updateUserMessage('* Could not sign up. Please try again.'));
                }
            });
    };
};

export const login = (user) => {
    return(dispatch) => {
        axios.post(loginUrl, user)
            .then(res => {
                if(res.data.success) {
                    dispatch(checkUserLoggedIn());
                }
                if(res.data.err) {
                    dispatch(updateUserMessage(res.data.message));
                }
            })
            .then(err => {
                if(err) {
                    dispatch(updateUserMessage('* There was an error loggin in. Please try again.'));
                }
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        axios.get(logoutUrl)
            .then(err => {
                if(err) {
                    console.log(err);
                }
                dispatch(userUpdated(false));
            });
    };
};

export const userUpdated = (user) => {
    return {
        type: 'USER_UPDATED',
        user
    };
};

export const updateUserMessage = (message) => {
    return {
        type: 'USER_MESSAGE_UPDATED',
        userMessage: message
    };
};