import React, { useState } from 'react';
import { atom, useRecoilState, RecoilRoot } from 'recoil';
import cardsChat from './cardsChat.css';
import { pageimEndPoint } from './../../Config';
import { addNewRow } from '../../services/sendMessageService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_ENDPOINT = pageimEndPoint();


const CardsChat = () => {
  let APP = window.location.pathname.toString();
  APP = APP ? APP.substr(1).toLowerCase() : '';
  const [openChat, setOpenChat] = useState('false');

  const notify = () => {
    toast.info("Thanks, sending your message.",{autoClose: 2000});
  }
  function handleChat() {
    setFormData({ name: '', phone: '', email: '', message: '', name_ho: '', email_ho: '' });
    if (openChat === 'true')
      notify();
    setOpenChat(x => x === 'true' ? 'false' : 'true');
  }
  const ScrollPosition = atom({
    key: "_setthecrollPosition",
    default: 'true',
  });
  const [scrollPosition, setScrollPosition] = useRecoilState(ScrollPosition);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', name_ho: '', email_ho: '' });

  const handleInputChange = e => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const submitRow = async e => {
    e.preventDefault();

    if (!formData.message) return
    if (formData.message && formData.message.length > 500 || formData.name && formData.name.length > 50 || formData.phone && formData.phone.length > 15 || formData.email && formData.email.length > 50)
      return
      if (!APP )  
        return
    const URL = `${API_ENDPOINT}/pageim/user_messages?appname=${APP}`;
    await addNewRow(formData, URL);
    handleChat();

  }


  return (
    <>
      <ToastContainer />

      <div className={`mobile-up ${scrollPosition == 'true' || scrollPosition === 0 ? 'chatIconHide' : null}`} id="chat__btn1" >
        <a href="#"><i className="fas fa-chevron-up"></i></a>
      </div>
      <div className="chat__btn" id="chat__btn" onClick={handleChat}>
        <a href="#"><i className="far fa-comment-alt"></i></a>
      </div>
      <div className="chat__box">
        <form className={`form    ${openChat === 'true' ? "active" : ""}`}>
          <textarea className="textarea" value={formData.message} name='message' onChange={handleInputChange} placeholder="Please let us know what we can do for you in the future."></textarea>
          <div className='user_data_message'>
            <div className='row'>
              <input className='user_data user_data_name' name='name' type='text' value={formData.name} onChange={handleInputChange} placeholder='Name'>
              </input></div>

            <div className='row'>
              <input className='user_data user_data_phone' name='phone' type='phone' value={formData.phone} onChange={handleInputChange} placeholder='Phone'>
              </input></div>
            <div className='row'>
              <input className='user_data user_data_email' name='email' type='email' value={formData.email} onChange={handleInputChange} placeholder='E-mail'>
              </input></div>
          </div>
          <div>
            <label className="h_o_n_y" htmlFor="nameho">name</label>
            <input className='h_o_n_y' autoComplete="off" type="text" id="name_ho" value={formData.name_ho} onChange={handleInputChange} name="name_ho" placeholder="Your name here"></input>
            <label className="h_o_n_y" htmlFor="nameho">e-mail</label>
            <input className='h_o_n_y' autoComplete="off" type="text" id="nemail_ho" value={formData.email_ho} onChange={handleInputChange} name="email_ho" placeholder="Your e_mail here"></input>
          </div>
          <div className="frm__btn">
            <button className="submit _close" type="submit" onClick={handleChat}>Close<i className="fas fa-times"></i></button>
            <button className="submit" type="submit" onClick={submitRow}>Submit <i className="fas fa-paper-plane"></i></button>
          </div>
        </form>
      </div>
    </>

  )
}
export default CardsChat;