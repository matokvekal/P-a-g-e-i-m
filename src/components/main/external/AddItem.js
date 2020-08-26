import React, { useState } from 'react';
import { atom, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { dataState } from "./TodoWatsApp";
import { statusComplite } from "./TodoWatsApp";
// import 'antd/dist/antd.css';
import { Button } from 'antd';

function AddItem(props) {
   function setLocalStorage(){
      window.localStorage.setItem('data', JSON.stringify(data));
    }
   // const setData=props.setData;
   function getMaxId() {
      const maxValueOfY = Math.max(...data.map(o => o.id), 0);
      return maxValueOfY;
   }
   function getDate() {
      // debugger
      const d = new Date();
      const n = d.toLocaleDateString();
      const t = d.toLocaleTimeString();
      return 'created ' + n + '     ' + t;
   }
   const textState = atom({
      key: "textState1",
      default: "",
   });
   const currentTopic = props.id;
   const [text, setText] = useRecoilState(textState);
   const data = useRecoilValue(dataState);
   const setData = useSetRecoilState(dataState);
   const setRadioSelect = useSetRecoilState(statusComplite);

   const insert = (event) => {
      event.preventDefault();
      if (!text.length) return;
      setRadioSelect('open');
      try {
         setData(oldData => {
            const newData = [
               ...oldData,
               {
                  id: getMaxId() + 1,
                  parent: currentTopic,
                  type: 'chat',
                  messageTime: getDate(),
                  messageData: text,
                  isComplite: false,
                  deleted: false,

               },
            ];
            setText([]);
            return newData;
         });
         setLocalStorage();
      } catch (error) {
         console.log(error);
      }
   };

   const onchange = (event) => {
      setText(event.target.value);
   };

   return (
      <form className="">
         <div className="chat-message clearfix">
            <textarea value={text} onChange={onchange} name="message-to-send" id="message-to-send" disabled={currentTopic === 'All'}
               placeholder={currentTopic === 'All' ? 'Select folder  to add task' : "Type your message"} rows="3"></textarea>
            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o"></i>
            <Button type="primary" onClick={insert} disabled={currentTopic === 'All'}> Add task</Button>
         </div>
      </form>
   );
}
export default AddItem;