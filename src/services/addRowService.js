import axios from 'axios';
import { pageimEndPoint } from '../Config';
import deviceIdentity from './../helpers/Helpers';

const API_ENDPOINT = pageimEndPoint();
    export const addNewRow=async(row)=>{
      if (!deviceIdentity())  
      return
          let APP = window.location.pathname.toString();
          APP= APP?APP.substr(1).toLowerCase():'';
            // let APP = window.location.pathname.toString();
            // APP= APP?APP.substr(1):'';
            // APP = APP.toLowerCase();
            const URL = `${API_ENDPOINT}/public/${APP}/add`;
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage['deviceIdentity']}` 
            // const config={
            //     headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
                
            // }
          const data=row;
 
            const response = await axios.post(URL,data)
            .then((response) => {
                return response;
              })
            .catch((response) => {
                return response;
              })


    }
