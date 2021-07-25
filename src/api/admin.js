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
    console.log({token})
    if (token) {
        localStorage.setItem(accessTokenKey, JSON.stringify(token))
        adminInstance.defaults.headers.common['Authorization'] = `${AUTH_HEADER_TYPE} ${token}`;
    }else{
        localStorage.removeItem(accessTokenKey)
    }
}
const setRefreshToken = (token) => {
    console.log({token})
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
        let res = await axios.post(AUTH_PING_URL, options)
        if (res.status === 200)
            return ResponseStatus.CORRECT
    } catch (err){
        return ResponseStatus.INCORRECT
    }
}

const initAuth = () => {
    let access = getAuthToken()
    let status = getAuthStatus()
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
    console.group('auth')
    try {
        let res = await axios.post(ADMIN_TOKEN_OBTAIN_URL, body, defaultOptions)
        console.log('success')
        setAuthToken(res.data.access)
        setRefreshToken(res.data.refresh)
        setAuthStatus(AuthStatus.AUTHENTICATED)
        console.log({access: getAuthToken()})
        console.log({refresh: getRefreshToken()})
        console.log({status: getAuthStatus()})
        console.groupEnd()
        return {status: ResponseStatus.CORRECT, data: {}}
    } catch (err) {
        let res = err.response
        setAuthStatus(AuthStatus.UNAUTHENTICATED)
        setAuthToken(undefined)
        setRefreshToken(undefined)
        console.log('auth error', {err})
        console.log({access: getAuthToken()})
        console.log({refresh: getRefreshToken()})
        console.log({status: getAuthStatus()})
        console.groupEnd()
        return {status: ResponseStatus.INCORRECT, data: {res}}
    }
}

const checkAuth =  () => {
    let authStatus = getAuthStatus()
    let access = getAuthToken()
    if (!!authStatus & !!access && (authStatus === AuthStatus.AUTHENTICATED)) {
        console.log('auth true')
        return AuthStatus.AUTHENTICATED
    }
    else {
        console.log('auth false')
        return AuthStatus.UNAUTHENTICATED
    }
}

const refresh = async () => {
    let refresh = getRefreshToken()
    let res
    console.group('refresh')
    if (refresh){
        try{

            let body = {refresh}
            res = await axios.post(ADMIN_TOKEN_REFRESH_URL, body, defaultOptions)
            console.log('success')
            console.log({res})
            let access = res.data.access
            setAuthToken(access)
            console.log({access: getAuthToken()})
            console.log({refresh: getRefreshToken()})
            console.log({status: getAuthStatus()})
            console.groupEnd()
            return ResponseStatus.CORRECT
        }
        catch (err){
            console.log('error')
            setRefreshToken(undefined)
            setAuthToken(undefined)
            setAuthStatus(AuthStatus.UNAUTHENTICATED)
            console.log({access: getAuthToken()})
            console.log({refresh: getRefreshToken()})
            console.log({status: getAuthStatus()})
            console.groupEnd()
            return ResponseStatus.INCORRECT
        }
    }
}

adminInstance.interceptors.response.use(res => res, err => {
    console.group('adminInstance error')
    console.log({err})
    if (err.config && err.response && err.response.status === 401) {
        console.log('refresh')
        return refresh().then(status => {
            if (status === ResponseStatus.CORRECT) {
                console.log('Correct, retry request')
                err.config.headers['Authorization'] = `${AUTH_HEADER_TYPE} ${getAuthToken()}`
                console.log({headers: err.config.headers})
                console.groupEnd()
                return axios.request(err.config);
            }
            else {
                console.log('Incorrect, go to login page')
                setAuthToken(undefined)
                setRefreshToken(undefined)
                setAuthStatus(AuthStatus.UNAUTHENTICATED)
                console.log({access: getAuthToken()})
                console.log({refresh: getRefreshToken()})
                console.log({status: getAuthStatus()})
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