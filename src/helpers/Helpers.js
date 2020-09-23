import { pageimEndPoint } from './../Config';

export const url = (db,appName,action) => {
    const API_ENDPOINT = pageimEndPoint();
    
    const URL = `${API_ENDPOINT}/${db?db+'/':''}${appName}${action?'/'+action:''}`;
    return URL;
}

export default function deviceIdentity(){
    debugger
    if (!localStorage["deviceIdentity"] || localStorage["deviceIdentity"] === null || localStorage["deviceIdentity"] === "undefined") {
        console.log('no freeUserToken table2');
        return false;
      }
      return true;
}
