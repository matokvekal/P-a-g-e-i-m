import axios from 'axios';
import { pageimEndPoint } from '../Config';
import deviceIdentity from './../helpers/Helpers';
// const API_ENDPOINT = pageimEndPoint();
export const addNewRow =  (row,url) => {
  
  if (!deviceIdentity())
    return
  let APP = window.location.pathname.toString();
  APP = APP ? APP.substr(1).toLowerCase() : '';

  debugger
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',Authorization: "Bearer " + localStorage['deviceIdentity'] 
      },
      body: JSON.stringify({
        data: row, 
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.success==='true')
        alert('OK')
        return result})
      .catch((err) => console.log('error'))
  

}


