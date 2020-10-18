import { pageimEndPoint } from './../Config';

export const url = (db,appName,action) => {
    const API_ENDPOINT = pageimEndPoint();
    
    const URL = `${API_ENDPOINT}/${db?db+'/':''}${appName}${action?'/'+action:''}`;
    return URL;
}

export default function deviceIdentity(){
    
    if (!localStorage["deviceIdentity"] || localStorage["deviceIdentity"] === null || localStorage["deviceIdentity"] === "undefined") {
        console.log('no freeUserToken ');
        return false;
      }
      return true;
}

export const  getApp=()=>{
    debugger
    let APP = window.location.pathname.toString();
    APP = APP ? APP.substr(1).toLowerCase() : '';
    return APP;
}