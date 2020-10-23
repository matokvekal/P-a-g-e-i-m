import React, { useState } from 'react';
// import smsAuth from './smsAuth.css';
import { atom, useRecoilState } from 'recoil';
import loginModal from './loginModal.css';
import useLogin from './LogIn';
// import useCustomefetch from './../../../hooks/useCustomFetch';
// import { pageimEndPoint } from '../../../Config';
// import deviceIdentity from '../../../helpers/Helpers';

import Timer from './Timer';



const LoginModal = () => {
   const [agree, setAgree] = useState(false);
   const [ timerDown,setTimerDown] = useState(1);
   const { closeModal, submitLogin, submitPassword, inputMobileNumber, inputPersonalName, inputPassword, mobileNumber, personalName, password } = useLogin();
   function handleAgree() {
      setAgree(!agree)
   }
   const loginModal = atom({
      key: "_LoginModal",
      default: {
         formType: '',
         active: false,
         message: '<p></p>',
      },
   });
   const [modalLogin] = useRecoilState(loginModal);

   return (
      <div className={`login card__item ${modalLogin.active &&timerDown!=0? 'active' : null}`} id="popup">
         <div className="container1">
            <div className="error"></div>
            <form id="frm-mobile-verification">
               <div className="form-row close" onClick={closeModal}><i className="fa fa-close"></i></div>
               <div className="form-heading">Mobile registration form</div>

               {modalLogin.formType === 'login' && (
                  <>
                     <div className="form-row">
                        <label>{modalLogin.message}</label>
                     </div>
                     <div className="form-row">
                        <input type="text" id="personalName" className="form-input name" onChange={inputPersonalName}
                           placeholder="Your name" value={personalName} required />
                     </div>
                     <div className="form-row">
                        <input type="tel" id="mobile" className="form-input" onChange={inputMobileNumber}
                           placeholder="Mobile Number" value={mobileNumber} pattern="^\d{3}-\d{7}$" required />

                     </div>
                     <input className="checkbox agree" type="checkbox" onClick={handleAgree} checked={agree} /><span className="checkboxtext" required>קראתי ואני מסכים עם תנאי השימוש{agree}</span>
                     <input type="button" className="btnSubmit" value="Send OTP" onClick={submitLogin} disabled={!agree}/>
                  </>
               )}

               {modalLogin.formType === 'password' &&
                  (<>
                     <div className="form-row">
                        <label>{modalLogin.message}</label>
                     </div>
                     <Timer isActive={true} timeLimit='60' setTimerDown={setTimerDown} />
                     <div className="form-row">
                        <input type="number" id="personalName" className="form-input" onChange={inputPassword}
                           placeholder="Insewrt code" value={password} required />
                     </div>
                     <input type="button" className="btnSubmit" value="SEND"
                        onClick={submitPassword} />
                  </>)}

               {modalLogin.formType === 'message' &&
                  (<>
                     <div className="form-row">
                        <label>{modalLogin.message}</label>
                     </div>
                  </>)}


            </form>
         </div>
      </div>

   )
}

export default LoginModal;