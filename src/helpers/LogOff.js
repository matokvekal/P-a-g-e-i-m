import React, { createContext, useState, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import LoginModal from './LoginModal';
import { pageimEndPoint } from './../Config';
import deviceIdentity from './Helpers';
const API_ENDPOINT = pageimEndPoint();

const isLogIn = atom({
   key: "_logIn",
   default: 'false',
});
const loginModal = atom({
   key: "_LoginModal",
   default: {
      formType: '',
      active: false,
      message: '<p></p>',
   },
});


function UseLogOff() {
   let APP = window.location.pathname.toString();
   APP = APP ? APP.substr(1).toLowerCase() : '';
   const [modalLogin, setModalLogin] = useRecoilState(loginModal);
   const [login, setLogin] = useRecoilState(isLogIn);

   if (!APP)
      return;
   const URL = `${API_ENDPOINT}/pageim/logOff?appname=${APP}`;
   fetch(URL, {
      method: 'GET',
      headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
   })
      .then(response => {
         return response.json();
      })
      .then(res => {
         if (res && res.res && res.res[0] && res.res[0].success === false) {
            setLogin(false);
            localStorage["isLogin"] = 'false';
         }
      })
      .catch((error) => {
         console.error('Error:', error);
      });
}
export default UseLogOff;


