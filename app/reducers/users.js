export const user = (state = false, action) => {
    switch(action.type) {
        case 'USER_UPDATED':
            return action.user;
            
        default:
            return state;
    }
};

export const userMessage = (state = '', action) => {
    switch(action.type) {
        case 'USER_SETTINGS_MESSAGE_UPDATED':
            return action.userMessage;
            
        default:
            return state;
    }
};