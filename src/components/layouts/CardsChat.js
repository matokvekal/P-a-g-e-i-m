import React ,{useState}from 'react';

const CardsChat=()=>{
const [openChat,setOpenChat]=useState('false');
function handleChat(){
  setOpenChat(x => x === 'true' ? 'false' : 'true');

}
// {
//   // Chat box
// var chatBtn = document.getElementById('chat__btn');
// var form = document.querySelector('.form');
// chatBtn.addEventListener('click', ()=>{
//     form.classList.add('active');
// })
// var closeBtn = document.querySelector('.close');
// closeBtn.addEventListener('click', ()=>{
//     form.classList.remove('active')
// })
// }
   return(
      <>
         <div className="mobile-up" id="chat__btn1" >
        <a href="#"><i className="fas fa-chevron-up"></i></a>
      </div>
        <div className="chat__btn" id="chat__btn" onClick={handleChat}>
        <a href="#"><i className="far fa-comment-alt"></i></a>
      </div>
      <div className="chat__box">
        <form  className={`form    ${openChat === 'true' ? "active" : ""}`}>
          <textarea className="textarea" placeholder="Please let us know what we can do for you in the future."></textarea>
          <div className="frm__btn">
            <button className="close" type="submit"><i className="fas fa-times"></i>Close</button>
            <button className="submit" type="submit">Submit <i className="fas fa-paper-plane"></i></button>
          </div>
        </form>
      </div>
      </>

   )
}
export default CardsChat;