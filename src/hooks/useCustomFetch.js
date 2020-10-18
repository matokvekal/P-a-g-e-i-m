import { useEffect, useState } from 'react';
import { pageimEndPoint } from '../Config'
import deviceIdentity from '../helpers/Helpers';

const API_ENDPOINT = pageimEndPoint();

function useCustomfetch(url) {

   
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(null);

   async function customeFetch(url) {
      debugger
      try {
         const URL = `${API_ENDPOINT}${url}`;
         //get
         //let response = await fetch(URL);
         //post
         if (!deviceIdentity())
            return
         let response = await fetch(URL, {
            method: 'GET',
            headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
         })
         let res = await response.json();
         debugger
         setData(res);
         setLoading(false);
      }
      catch (e) {
         setError(e);
         setLoading(false);
      }
   }

   useEffect(() => {
      debugger
      if (url) {
         setLoading(true);
         customeFetch(url);
      }
   }, [url]);
   return [data, loading, error];
}


export default useCustomfetch;