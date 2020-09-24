import axios from 'axios';
import { pageimEndPoint } from '../Config';
import deviceIdentity from './../helpers/Helpers';

const API_ENDPOINT = pageimEndPoint();
    export const editRow=async(row)=>{
      if (!deviceIdentity())  
      return
            let APP = window.location.pathname.toString();
            APP= APP?APP.substr(1):'';
            APP = APP.toLowerCase();
            const URL = `${API_ENDPOINT}/public/${APP}/update`;
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage['deviceIdentity']}` 

          const data=row;
 
            const response = await axios.post(URL,data)
            .then((response) => {
                //console.log("RESPONSE RECEIVED: ", response);
                return response;
              })
            .catch((response) => {
                //console.log("AXIOS ERROR: ", response);
                return response;
              })


    }
