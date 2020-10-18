// import React, { createContext, useState, useEffect } from 'react';
// import smsAuth from './smsAuth.css';
// import { atom, useRecoilState, RecoilRoot } from 'recoil';
// import useCustomefetch from './../../../hooks/useCustomFetch';
// import { pageimEndPoint } from '../../../Config';
// import deviceIdentity from '../../../helpers/Helpers';
// import useCustomfetch from '../../../hooks/useCustomFetch';
// import Timer from '../../../helpers/Timer';

// const API_ENDPOINT = pageimEndPoint();


// const SmsAuth = () => {
// 	const smsModal = atom({
// 		key: "_setsmsModal",
// 		default: {
// 			active: '',
// 			message: '',
// 		},
// 	});

// 	const isLogIn = atom({
// 		key: "_logIn",
// 		default: 'false',
// 	 });
// 	 const [login, setLogin] = useRecoilState(isLogIn);
// 	const [modalSms, setModalSms] = useRecoilState(smsModal);
// 	const [mobileNumber, setMobileNumber] = useState('');
// 	const [personalName, setPersonalName] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [formType, setFormType] = useState('first');
// 	const APP = `races`;//=====================================temporary
// 	const [url, setUrl] = useState(null);

// 	const [timerDown, setTimerDown] = useState(0);
// 	function handleMobileNumber(e) {
// 		setMobileNumber(e.target.value);
// 	}
// 	function handlePersonalName(e) {
// 		setPersonalName(e.target.value);
// 	}
// 	function handlePassword(e) {
// 		setPassword(e.target.value);
// 	}
// 	function closeModal() {
// 		setModalSms({ active: false, message: <p></p> });

// 		setMobileNumber('');
// 		setPersonalName('');
// 		setPassword('');
// 		setFormType('first');
// 	}
// 	function handleLogin() {
// 		//send to server

// 		if (localStorage['login_trys'] && Number(localStorage['login_trys']) >= 3 && localStorage['login_last_try'] && localStorage['login_last_try'] < (Date.now() - 20 * 60 * 1000) ) {
// 			setModalSms({ active: false, message: <p></p> });
// 			return
// 		}
// 		if (!mobileNumber || mobileNumber.length != 10 || mobileNumber.substring(0, 2) != "05" || !password || password.length != 6)
// 		return;

// 		const URL = `${API_ENDPOINT}/pageim/logon?appname=${APP}&cell=${mobileNumber}&password=${password}`;
// 		fetch(URL, {
// 			method: 'GET',
// 			headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
// 		})
// 			.then(response => {
// 				return response.json();
// 			})
// 			.then(res => {
// 				debugger
// 				if (res && res.success && res.success == 'true') {
// 					localStorage["isLogin"] = 'true';
// 					localStorage['login_trys'] = 0;
// 					setLogin(true);
// 					setModalSms({ active: false, message: <p></p> });
// 				}
// 				else {
// 					setLogin(false);
// 					if (localStorage['login_trys'])
// 						localStorage['login_trys'] = Number(localStorage['login_trys']) + 1;
// 					else
// 						localStorage['login_trys'] = 1;

// 					setModalSms({ active: true, message: <i className="fas fa-heart" style={{ color: 'red' }}>Login fail</i> });
// 					closeModal();
// 				}
// 			})
// 			.catch((error) => {
// 				console.error('Error:', error);
// 			});
// 	}



// 	function handleOTP(e) {

// 		if (!mobileNumber || mobileNumber.length != 10 || mobileNumber.substring(0, 2) != "05" || !personalName || !deviceIdentity())
// 			return;
// 		//  setLoader(true);

// 		const URL = `${API_ENDPOINT}/pageim/register?appname=${APP}&mobileNumber=${mobileNumber}&personalName=${personalName}`;
// 		fetch(URL, {
// 			method: 'GET',
// 			headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
// 		})
// 			.then(response => {
// 				return response.json();
// 			})
// 			.then(res => {
// 				//debugger
// 				if (res && res === true) {

// 					setModalSms({ active: true, message: <i className="fas fa-heart" style={{ color: 'blue' }}>Enter 6 digit SMS  verification code  </i> });
// 					setFormType('second');
// 				}
// 				console.log(res);

// 			})
// 			.catch((error) => {
// 				console.error('Error:', error);
// 			});
// 	}

// 	function handleOTPNewWay(e) {
// 		debugger
// 		if (!mobileNumber || mobileNumber.length != 10 || mobileNumber.substring(0, 2) != "05" || !personalName || !deviceIdentity())
// 			return;

// 		const URL = `${API_ENDPOINT}/pageim/register?appname=${APP}&mobileNumber=${mobileNumber}&personalName=${personalName}`;
// 		setUrl(URL);
// 		//  useCustomfetch(url);
// 		//  setMobileNumber(null);	
// 		//  setPersonalName(null);			 

// 	}

// 	return (
// 		<div className={`card__item ${modalSms.active ? 'active' : null}`} id="popup">
// 			<div className="container">
// 				<div className="error"></div>
// 				<form id="frm-mobile-verification">
// 					<div className="form-row close" onClick={closeModal}><i className="fa fa-close"></i></div>
// 					<div className="form-heading">Mobile registration form</div>
// 					<h2 className="form-heading">{modalSms.message}</h2>

// 					{formType === 'first'
// 						?
// 						<>

// 							<div className="form-row">
// 								<input type="text" id="personalName" className="form-input name" onChange={handlePersonalName}
// 									placeholder="Your name" value={personalName} required />
// 							</div>
// 							<div className="form-row">
// 								<input type="tel" id="mobile" className="form-input" onChange={handleMobileNumber}
// 									placeholder="Mobile Number" value={mobileNumber} pattern="^\d{3}-\d{7}$" required />

// 							</div>
// 							<input className="checkbox" type="checkbox" /><span className="checkboxtext" required>קראתי ואני מסכים עם תנאי השימוש</span>
// 							<input type="button" className="btnSubmit" value="Send OTP" onClick={handleOTP} />
// 						</>
// 						:
// 						<>
// 							<Timer isActive={true} timeLimit='60' setTimerDown={setTimerDown} />
// 							<div className="form-row">
// 								<input type="number" id="personalName" className="form-input" onChange={handlePassword}
// 									placeholder="Insewrt code" value={password} required />
// 							</div>
// 							<input type="button" className="btnSubmit" value="SEND"
// 								onClick={handleLogin} />
// 						</>
// 					}

// 					{
// 						// loading && mobileNumber&&(<div>Loading ...</div>)
// 					}
// 					{/* {data &&(<div>{data}</div>)}
// 						{error &&(<div>{error}</div>)} */}
// 				</form>
// 			</div>
// 		</div>

// 	)
// }

// export default SmsAuth;