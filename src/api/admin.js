import {ADMIN_SERVER_URL} from "../constants/URL";
import {defaultOptions} from "./config";
import axios from "axios";
import {AuthStatus, ResponseStatus} from "../constants/api";


const ADMIN_TOKEN_OBTAIN_URL = `${ADMIN_SERVER_URL}auth/token/`
const ADMIN_TOKEN_REFRESH_URL = `${ADMIN_SERVER_URL}auth/token/refresh/`
const AUTH_PING_URL = `${ADMIN_SERVER_URL}ping/`

const AUTH_HEADER_TYPE  = 'Bearer'

const refreshTokenKey = 'refreshToken'
const accessTokenKey = 'accessToken'
const authStatusKey = 'authStatus'

const adminInstance = axios.create();


const setAuthHeader = () => {
    adminInstance.defaults.headers.common['Authorization'] = `${AUTH_HEADER_TYPE} ${getAuthToken()}`;
}

const getAuthToken = () => {
    return JSON.parse(localStorage.getItem(accessTokenKey))
}
const getRefreshToken = () => {
    return JSON.parse(localStorage.getItem(refreshTokenKey))
}
const getAuthStatus = () => {
    return JSON.parse(localStorage.getItem(authStatusKey))
}
const setAuthToken = (token) => {
    localStorage.setItem(accessTokenKey, JSON.stringify(token))
    adminInstance.defaults.headers.common['Authorization'] = `${AUTH_HEADER_TYPE} ${token}`;
}
const setRefreshToken = (token) => {
    localStorage.setItem(refreshTokenKey, JSON.stringify(token))
}
const setAuthStatus = (status) => {
    localStorage.setItem(authStatusKey, JSON.stringify(status))
}

setAuthHeader()

const auth = async (username, password) => {
    let body = {username, password}
    try {
        let res = await axios.post(ADMIN_TOKEN_OBTAIN_URL, body, defaultOptions)
        console.log(res)
        setAuthToken(res.data.access)
        setRefreshToken(res.data.refresh)
        setAuthStatus(AuthStatus.AUTHENTICATED)
        return {status: ResponseStatus.CORRECT, data: {}}
    } catch (err) {
        let res = err.response
        setAuthStatus(AuthStatus.UNAUTHENTICATED)
        setAuthToken('')
        setRefreshToken('')
        console.log('auth error', {err})
        return {status: ResponseStatus.INCORRECT, data: {res}}
    }
}

const checkAuth =  () => {
    let authStatus = getAuthStatus()
    let access = getAuthToken()
    if (!!authStatus & !!access && (authStatus === AuthStatus.AUTHENTICATED))
        return AuthStatus.AUTHENTICATED
    else
        return AuthStatus.UNAUTHENTICATED
}

const refresh = async () => {
    let refresh = getRefreshToken()
    let res
    if (refresh){
        try{
            let body = {refresh}
            res = await axios.post(ADMIN_TOKEN_REFRESH_URL, body, defaultOptions)
            console.log({res})
            let access = res.data.access
            setAuthToken(access)
            return ResponseStatus.CORRECT
        }
        catch (err){
            setRefreshToken('')
            setAuthToken('')
            setAuthStatus(AuthStatus.UNAUTHENTICATED)
            return ResponseStatus.INCORRECT
        }
    }
}

adminInstance.interceptors.response.use(res => res, err => {
    if (err.config && err.response && err.response.status === 401) {
        return refresh().then(status => {
            if (status === ResponseStatus.CORRECT) {
                err.config.headers['Authorization'] = `${AUTH_HEADER_TYPE} ${getAuthToken()}`
                return axios.request(err.config);
            }
            else {
                window.location = '/admin/auth'
            }
        });
    }
    return Promise.reject(err);
})
export {auth, checkAuth, refresh, adminInstance}