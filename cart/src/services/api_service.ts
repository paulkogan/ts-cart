import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
export const axiosGetRequest = async (requestURL:string, queryParams={}) => {
    
    const fullURL = process.env.REACT_APP_DEV_API_URL+requestURL


    const getConfig: AxiosRequestConfig = {    
        params: queryParams,
        withCredentials: true
      }


    axios.interceptors.request.use(
        config => {
            const token = sessionStorage.getItem('sessionToken');
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            config.headers['Content-Type'] = 'application/json';
            return config;
        },
        error => {
            Promise.reject(error)
    });

    try {
        const response: AxiosResponse = await axios.get(fullURL, getConfig)
        return response
    } catch(error){
        console.log("AXIOS GET ERR: "+error)
        
        return Promise.reject(error)
    }   
}

export const axiosPostRequest = async (requestURL:string, payload={}) => {
    const fullURL = process.env.REACT_APP_DEV_API_URL+requestURL


    const postConfig: AxiosRequestConfig = {    
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('sessionToken')}`,
            'Content-Type': 'application/json',
        }, 
        withCredentials: true,
      }

    const response: AxiosResponse = await axios.post(fullURL, payload, postConfig)
    return response

}

//export default {axiosGetRequest, axiosPostRequest};
