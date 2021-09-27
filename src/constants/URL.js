const DEV_LOCAL_SERVER_URL = "http://localhost:8000/"
let DEV_SERVER_URL
let _SERVER_URL

// temporary solution
if (process.env.REACT_APP_API_SERVER_URL) {
    DEV_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
} else {
    DEV_SERVER_URL = "https://fastcustoms-back-test.herokuapp.com/"
}

if (process.env.REACT_APP_MODE === 'LOCAL')
    _SERVER_URL = DEV_LOCAL_SERVER_URL
else
    _SERVER_URL = DEV_SERVER_URL

export const GEO_SERVER_URL = _SERVER_URL + "geo/"
export const ROUTES_SERVER_URL = _SERVER_URL + "route/"
export const ADMIN_SERVER_URL = _SERVER_URL + "api-admin/"
export const ORDER_SERVER_URL = _SERVER_URL + "order/"
export const REPORT_SERVER_URL = _SERVER_URL + "report/"
