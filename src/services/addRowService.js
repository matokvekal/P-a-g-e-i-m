import axios from 'axios';
import { pageimEndPoint } from '../Config';

const API_ENDPOINT = pageimEndPoint();
    export const addNewRow=async(row)=>{
        if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") 
        console.log('no freeUserToken add row')
        else
        {
            let APP = window.location.pathname.toString();
            APP= APP?APP.substr(1):'';
            const URL = `${API_ENDPOINT}/public/${APP}/add`;
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage['freeUserToken']}` 
            // const config={
            //     headers: { Authorization: "Bearer " + localStorage['freeUserToken'] },
                
            // }
          const data=row;
 
            const response = await axios.post(URL,data)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
              })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
              })
            console.log('addNewRow',response);
            debugger
            return response;
         
        }

    }
