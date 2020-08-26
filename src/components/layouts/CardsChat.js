import React from 'react';

const CardsChat=()=>{


   return(
      <>
        <div className="chat__btn" id="chat__btn">
        <a href="#"><i className="far fa-comment-alt"></i></a>
      </div>
      <div className="chat__box">
        <form className="form">
          <textarea className="textarea" placeholder="Type Your Message Here"></textarea>
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