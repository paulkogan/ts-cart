import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import url from 'url';
 
// const queryParams = {
//     limit: 1,
//     sort: "desc",
//   };


// axios.interceptors.request.use(
//     config => {
// 		if (store.state.token) { 
// 			config.headers.Authorization = `Bearer ${store.state.token}`;
// 		}
// 		console.log(config);
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

//            'Content-Type': 'application/json', 

const axiosGetRequest = async (baseUrl: string, rawParams: string = "", payload=null, ) => {
    //const API = axios.create({ string: null, baseURL: baseUrl });
    //const queryParams = new url.URLSearchParams(rawParams);
    const axiosOptions: AxiosRequestConfig = {    
        //string: null, 
        method: "GET",
        url: baseUrl,
        //params: queryParams,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('sessionToken')}`,
            'Content-Type': 'application/json',
        }
      }

    const response: AxiosResponse = await axios(axiosOptions)
    return response

}

export default axiosGetRequest;
