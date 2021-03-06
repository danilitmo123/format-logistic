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
    if (token) {
        localStorage.setItem(accessTokenKey, JSON.stringify(token))
        adminInstance.defaults.headers.common['Authorization'] = `${AUTH_HEADER_TYPE} ${token}`;
    }else{
        localStorage.removeItem(accessTokenKey)
    }
}
const setRefreshToken = (token) => {
    if (token) {
        localStorage.setItem(refreshTokenKey, JSON.stringify(token))
    } else{
        localStorage.removeItem(refreshTokenKey)
    }
}
const setAuthStatus = (status) => {
    localStorage.setItem(authStatusKey, JSON.stringify(status))
}


const pingAuth = async () => {
    const options = {
        Authorization: `${AUTH_HEADER_TYPE} ${getAuthToken()}`
    }
    try{
        let res = await axios.get(AUTH_PING_URL, {headers: options})
        if (res.status === 200)
            return ResponseStatus.CORRECT
    } catch (err){
        return ResponseStatus.INCORRECT
    }
}

const initAuth = async () => {
    await new Promise(r => setTimeout(r, 2000));
    let access = getAuthToken()
    let status = getAuthStatus()
    console.groupEnd()
    if (access && status && status === AuthStatus.AUTHENTICATED){
        pingAuth().then(status => {
            if (status === ResponseStatus.CORRECT){
                setAuthHeader()
            } else{
                setAuthStatus(AuthStatus.UNAUTHENTICATED)
                setAuthToken(null)
                setRefreshToken(null)
            }
        })
    } else {
        setAuthStatus(AuthStatus.UNAUTHENTICATED)
        setAuthToken(null)
        setRefreshToken(null)
    }
}

initAuth()

const auth = async (username, password) => {
    let body = {username, password}
    try {
        let res = await axios.post(ADMIN_TOKEN_OBTAIN_URL, body, defaultOptions)
        setAuthToken(res.data.access)
        setRefreshToken(res.data.refresh)
        setAuthStatus(AuthStatus.AUTHENTICATED)
        console.groupEnd()
        return {status: ResponseStatus.CORRECT, data: {}}
    } catch (err) {
        let res = err.response
        setAuthStatus(AuthStatus.UNAUTHENTICATED)
        setAuthToken(null)
        setRefreshToken(null)
        console.groupEnd()
        return {status: ResponseStatus.INCORRECT, data: {res}}
    }
}

const checkAuth =  () => {
    let authStatus = getAuthStatus()
    let access = getAuthToken()
    if (!!authStatus & !!access && (authStatus === AuthStatus.AUTHENTICATED)) {
        return AuthStatus.AUTHENTICATED
    }
    else {
        return AuthStatus.UNAUTHENTICATED
    }
}

const refresh = async () => {
    let refresh = getRefreshToken()
    let res
    if (refresh){
        try{

            let body = {refresh}
            res = await axios.post(ADMIN_TOKEN_REFRESH_URL, body, defaultOptions)
            let access = res.data.access
            setAuthToken(access)
            console.groupEnd()
            return ResponseStatus.CORRECT
        }
        catch (err){
            setRefreshToken(null)
            setAuthToken(null)
            setAuthStatus(AuthStatus.UNAUTHENTICATED)
            console.groupEnd()
            return ResponseStatus.INCORRECT
        }
    }
}

adminInstance.interceptors.response.use(res => res, err => {
    if (err.config && err.response && err.response.status === 401) {
        console.log('refresh')
        return refresh().then(status => {
            if (status === ResponseStatus.CORRECT) {
                err.config.headers['Authorization'] = `${AUTH_HEADER_TYPE} ${getAuthToken()}`
                console.groupEnd()
                return axios.request(err.config);
            }
            else {
                setAuthToken(null)
                setRefreshToken(null)
                setAuthStatus(AuthStatus.UNAUTHENTICATED)
                console.groupEnd()
                window.location = '/admin/auth'
                return Promise.reject(err)
            }
        });
    }
    console.groupEnd()
    return Promise.reject(err);
})
export {auth, checkAuth, refresh, adminInstance}