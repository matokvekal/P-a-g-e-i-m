import { pageimEndPoint } from './../Config';

export const url = (db,appName,action) => {
    const API_ENDPOINT = pageimEndPoint();
    
    const URL = `${API_ENDPOINT}/${db?db+'/':''}${appName}${action?'/'+action:''}`;
    return URL;
}
