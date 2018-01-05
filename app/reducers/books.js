export const booksHaveErrored = (state = false, action) => {
    switch(action.type) {
        case 'BOOKS_HAVE_ERRORED':
            return action.hasErrored;
            
        default:
            return state;
    }
};

export const tradeRequestError = (state = false, action) => {
    switch(action.type) {
        case 'TRADE_REQUEST_ERROR':
            return action.tradeRequestError;
            
        default:
            return state;
    }  
};

export const bookSearchErrorMessage = (state = false, action) => {
    switch(action.type) {
        case 'BOOK_SEARCH_ERROR':
            return action.searchError;
            
        default:
            return state;
    }
};

export const books = (state = [], action) => {
    switch(action.type) {
        case 'BOOKS_UPDATED':
            return action.booksData;
            
        default:
            return state;
    }
};