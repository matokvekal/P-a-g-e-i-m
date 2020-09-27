import React, { createContext, useState, useEffect } from 'react';
import smsAuth from './smsAuth.css';

const SmsAuth = () => {


    return (
        <div className="card__item " id="popup">
        {/* <div className="card__item active" id="popup"> */}
          	<div className="container">
		<div className="error"></div>
		<form id="frm-mobile-verification">
			<div className="form-heading">Mobile Number Verification</div>

			<div className="form-row">
				<input type="number" id="mobile" className="form-input"
					placeholder="Enter the 10 digit mobile"/>
			</div>

			<input type="button" className="btnSubmit" value="Send OTP"
				onClick="sendOTP();"/>
		</form>
	</div>
        </div>

    )
}

export default SmsAuth;