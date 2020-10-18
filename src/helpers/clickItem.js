import React, { createContext, useState, useEffect } from 'react';

import { pageimEndPoint } from './../Config';

const API_ENDPOINT = pageimEndPoint();



function ClickItem(item,key,value,rowid) {
   let APP = window.location.pathname.toString();
   APP = APP ? APP.substr(1).toLowerCase() : '';
   const URL = `${API_ENDPOINT}/pageim/clickItem?appname=${APP}&rowId=${rowid}&key=${key}&item=${item}&value=${value}`;
   fetch(URL, {
      method: 'GET',
      headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
   })
      .then(response => {
         return response.json();
      })
      .catch((error) => {
         console.error('Error:', error);
      });
}
export default ClickItem;


