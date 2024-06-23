import axios from "axios"

export const getApi = async (url) => {
    let apiUrl = import.meta.env.APP_API_URL
    apiUrl = apiUrl + url

    let result = await axios
    .get(apiUrl)
    .then((resp)=>{
        return {
            status: true,
            resp: resp
        }
    })
    .catch((err)=>{
        return {
            status: false,
            err: err
        }
    })

    return result;
}

export const postApi = async (url, data) => {
    let apiUrl = import.meta.env.APP_API_URL
    apiUrl = apiUrl + url

    let result = await axios
    .post(apiUrl, data)
    .then((resp)=>{
        return {
            status: true,
            resp: resp
        }
    })
    .catch((err)=>{
        return {
            status: false,
            err: err
        }
    })

    return result;
}