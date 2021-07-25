const ResponseStatus = Object.freeze({
    CORRECT: 'CORRECT',
    INCORRECT: 'INCORRECT',
})

const AuthStatus = Object.freeze({
    AUTHENTICATED: 'AUTHENTICATED',
    UNAUTHENTICATED: 'AUTHENTICATED',
    EXPIRED: 'EXPIRED'
})

export {ResponseStatus, AuthStatus}
