import axios from "axios";
import { BASE_URL } from "./ApiConstants";

function getAxiosInstance() {
    const instance = axios.create({
      baseURL: BASE_URL,
      timeout: 15000
    });
    return instance;
  }

  export const createInstance = () => {
    axios.create({
      baseURL: BASE_URL,
      timeout: 15000
    });
  }

  export function post(url, data = {}, config = {}) {
    return getAxiosInstance().post(url, data, config);
  }

  //POST METHOD
  export function postAxios(url, params = {}, headers = {}, initialCallback , onCompletionCallBack) {

    if(initialCallback){
      initialCallback();
    }

    var urlValue = `${BASE_URL}${url}`
    console.log("REQUEST URL:",urlValue)
    console.log("REQUEST PARAMS:",params)
    console.log("REQUEST METHOD: POST")
    
      axios.post(urlValue, params, {headers: headers})
      .then(function (response) {
        console.log('URL----' + urlValue + '/n Request Method------  POST' + '/n Params-----' + params + '/n Response----' + response)
        onCompletionCallBack(response.data)
      })
      .catch(function (error) {
        console.log('Error', error)
        onCompletionCallBack(error)
      });
      
  }

  // GET METHOD
  export function getAxios(url, params = {},headers = {}, initialCallback , onCompletionCallBack) {
    if(initialCallback){
      initialCallback();
    }

    var urlValue = `${BASE_URL}${url}`
    console.log("REQUEST URL:",urlValue)
    console.log("REQUEST PARAMS:",params)
    console.log("REQUEST METHOD: GET")

      axios.get(urlValue, params, {headers: headers})
      .then(function (response) {
        console.log('URL----' + urlValue + '/n Request Method------  GET' + '/n Params-----' + params + '/n Response----' + JSON.stringify(response))
        onCompletionCallBack(response.data)
      })
      .catch(function (error) {
        console.log('Error', error)
        onCompletionCallBack(error)
      });
  }

  //PUT METHOD
  export function putAxios(url, params = {}, headers = {}, initialCallback , onCompletionCallBack) {
    if(initialCallback){
      initialCallback();
    }

    var urlValue = `${BASE_URL}${url}`
    console.log("REQUEST URL:",urlValue)
    console.log("REQUEST PARAMS:",params)
    console.log("REQUEST METHOD: PUT")

      axios.put(urlValue, params, {headers: headers})
      .then(function (response) {
        console.log('URL----' + urlValue + '/n Request Method------  PUT' + '/n Params-----' + params + '/n Response----' + JSON.stringify(response))
        onCompletionCallBack(response.data)
      })
      .catch(function (error) {
        console.log('Error', error)
        onCompletionCallBack(error)
      });
     
  }

  //DELETE METHOD
  export function deleteAxios(url, params = {}, headers = {}, initialCallback , onCompletionCallBack) {
    if(initialCallback){
      initialCallback();
    }

    var urlValue = `${BASE_URL}${url}`
    console.log("REQUEST URL:",urlValue)
    console.log("REQUEST PARAMS:",params)
    console.log("REQUEST METHOD: DELETE")

      axios.delete(urlValue, params, {headers: headers})
      .then(function (response) {
        Logger.log('URL----' + urlValue + '/n Request Method------  DELETE' + '/n Params-----' + params + '/n Response----' + JSON.stringify(response))
        onCompletionCallBack(response.data)
      })
      .catch(function (error) {
        Logger.log('Error', error)
        onCompletionCallBack(error)
      });
  }

  export function getJsonHeader(){
    var headers = {
      'Content-Type': 'application/json'
    }
    return headers
  }

  export function getFormDataHeader(){
    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return headers
  }


  //Login Api Call  --> testing purpose
  export function loginApiCall(url, params, initialCallback, onCompletionCallBack) {
    postAxios(url, params, {} , initialCallback, onCompletionCallBack);
  }

