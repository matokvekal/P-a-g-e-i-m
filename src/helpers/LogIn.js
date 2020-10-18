import React, { createContext, useState, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
// import UseLogOff from './LogOff';
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


function useLogIn() {
   const APP = `races`;//=====================================temporary
   const [modalLogin, setModalLogin] = useRecoilState(loginModal);
   const [login, setLogin] = useRecoilState(isLogIn);
   const [timerDown, setTimerDown] = useState(0);
   const [mobileNumber, setMobileNumber] = useState('');
   const [personalName, setPersonalName] = useState('');
   const [password, setPassword] = useState('');

   function inputMobileNumber(e) {
      setMobileNumber(e.target.value);
   }
   function inputPersonalName(e) {
      setPersonalName(e.target.value);
   }
   function inputPassword(e) {
      setPassword(e.target.value);
   }

   const submitLogin = () => {

      if (!mobileNumber || mobileNumber.length != 10 || mobileNumber.substring(0, 2) != "05" || !personalName || personalName.length > 30 || mobileNumber.length <= 3 || !deviceIdentity()) {
         debugger
         setModalLogin({ active: true, message: <p style={{ color: 'red' }}>Please insert all require data!</p>, formType: 'message' });
         setTimeout(function () { closeModal(); }, 3000);

      }
      else {
         if (localStorage['login_trys'])
            localStorage['login_trys'] = Number(localStorage['login_trys']) + 1;
         else
            localStorage['login_trys'] = 1;

         localStorage['login_last_try'] = Date.now();
         const URL = `${API_ENDPOINT}/pageim/register?appname=${APP}&mobileNumber=${mobileNumber}&personalName=${personalName}`;
         fetch(URL, {
            method: 'GET',
            headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
         })
            .then(response => {
               return response.json();
            })
            .then(res => {
               if (res && res === true) {
                  setModalLogin({ active: true, message: <p style={{ color: 'blue' }}> Enter 6 digit SMS  verification code </p>, formType: 'password' });
               }
               console.log(res);

            })
            .catch((error) => {
               console.error('Error:', error);
            });
      }
   }

   const submitPassword = () => {

      if (localStorage['login_trys'] && Number(localStorage['login_trys']) >= 3 && localStorage['login_last_try'] && localStorage['login_last_try'] < (Date.now() - 20 * 60 * 1000)) {
         setModalLogin({ active: false, message: <p></p> });
         return
      }
      if (!mobileNumber || mobileNumber.length != 10 || mobileNumber.substring(0, 2) != "05" || !password || password.length != 6)
         return;

      const URL = `${API_ENDPOINT}/pageim/logon?appname=${APP}&cell=${mobileNumber}&password=${password}`;
      fetch(URL, {
         method: 'GET',
         headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
      })
         .then(response => {
            return response.json();
         })
         .then(res => {
            debugger
            if (res && res.success && res.success == 'true') {
               localStorage["isLogin"] = 'true';
               localStorage['login_trys'] = 0;
               localStorage['login_last_try'] = '';
               setLogin(true);

            }
            else {
               setModalLogin({ active: false, message: <p></p> });
               setLogin(false);
               setModalLogin({ active: true, message: <p>Login Fail</p>, formType: 'message' });
               // setModalLogin({ active: true, message: <p><i className="fas fa-heart" style={{ color: 'red' }}>Login fail</i>qqq</p> });
               // setTimeout(function () { closeModal(); }, 3000);
               setTimeout(function () { closeModal(); }, 3000);
            }
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   }
   function logOff() {
      const URL = `${API_ENDPOINT}/pageim/logOff?appname=${APP}`;
      fetch(URL, {
         method: 'GET',
         headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
      })
         .then(response => {
            return response.json();
         })
         .then(res => {
            if (res && res.success === 'true') {
               setLogin(false);
               localStorage["isLogin"] = 'false';
            }
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   }

   const closeModal = () => {
      setModalLogin({ active: false, formType: 'message' });
      setMobileNumber('');
      setPersonalName('');
      setPassword('');

   }
   function handleLogin(info) {
      debugger
      if (login === true) {
         logOff();
      }
      else {
         if (localStorage['login_trys'] && Number(localStorage['login_trys']) >= 3 && localStorage['login_last_try'] && Number(localStorage['login_last_try']) > (Date.now() - 20 * 60 * 1000)) {
            setModalLogin({ active: true, message: <p>You have 0 trys, please wait 20 minuts</p>, formType: 'message' });
         }
         else
            setModalLogin({ active: true, message: <i className="fas fa-heart" style={{ color: 'red' }}>{info}</i>, formType: 'login' });
      }
   }
   function addLikeLogin(info) {
      if (login === false) {

         if (localStorage['login_trys'] && Number(localStorage['login_trys']) >= 3 && localStorage['login_last_try'] && Number(localStorage['login_last_try']) > (Date.now() - 20 * 60 * 1000)) {
            setModalLogin({ active: true, message: <p>You have 0 trys, please wait 20 minuts</p>, formType: 'message' });
         }
         else
            setModalLogin({ active: true, message: <i className="fas fa-heart" style={{ color: 'red' }}>{info}</i>, formType: 'login' });
      }
   }


   return { addLikeLogin, closeModal, handleLogin, submitLogin, submitPassword, inputMobileNumber, inputPersonalName, inputPassword, mobileNumber, personalName, password }
}

export default useLogIn;


