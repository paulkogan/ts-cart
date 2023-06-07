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

//params from array
//const params = new URLSearchParams([['answer', 42]]);
//const res = await axios.get(url, { params });

const axiosGetRequest = async (baseUrl:string, queryParams={}, payload={}, ) => {
    //const API = axios.create({ string: null, baseURL: baseUrl });
    //const queryParams = url.URLSearchParams(rawParams);
    const axiosOptions: AxiosRequestConfig = {    
        //string: null, 
        method: "GET",
        url: baseUrl,
        params: queryParams,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('sessionToken')}`,
            'Content-Type': 'application/json',
        }
      }

    const response: AxiosResponse = await axios(axiosOptions)
    return response

}

export default axiosGetRequest;
