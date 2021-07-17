const DEV_SERVER_URL = "https://ancient-temple-39835.herokuapp.com/"
const DEV_LOCAL_SERVER_URL = "http://localhost:8000/"

let _SERVER_URL

// temporary solution
const RUN_LOCAL = false

if (RUN_LOCAL)
    _SERVER_URL = DEV_LOCAL_SERVER_URL
else
    _SERVER_URL = DEV_SERVER_URL

export const GEO_SERVER_URL = _SERVER_URL + "geo/"
export const ROUTES_SERVER_URL = _SERVER_URL + "route/"
export const ADMIN_SERVER_URL = _SERVER_URL + "api-admin/"

