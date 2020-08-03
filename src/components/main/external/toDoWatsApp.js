import React,{useState} from 'react';
import './TodoWatsApp.css';
import { now } from 'moment';
import Todos from './todo/Todos';
import { RecoilRoot } from "recoil";
import AddTodo from "./todo/AddTodo";
import Item from 'antd/lib/list/Item';

const topics = [
  {
    id:1,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==",
    topicName: 'פיתוח מערכת',
    statusData: 'Open task',

  },
  {
    id:2,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==",
    topicName: 'באגים',
    statusData: 'Open task',
  },
  {
    id:3,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==",
    topicName: 'משימות אישיות',
    statusData: 'Open task',
  },
  {
    id:4,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==",
    topicName: 'קניות',
    statusData: 'Open task',
  },
  {
    id:5,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==",
    topicName: 'דחוף',
    statusData: 'Open task',
  },
  {
    id:6,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==",
    topicName: 'פיתוח עתידי',
    statusData: 'Open task',
  },
  {
    id:7,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==",
    topicName: 'בית ספר',
    statusData: 'Open task',
  },
  {
    id:8,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==",
    topicName: 'סרטים',
    statusData: 'Open task',
  },
  {
    id:9,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==",
    topicName: 'לתקן',
    statusData: 'Open task',
  },
  {
    id:10,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==",
    topicName: 'אימונים',
    statusData: 'Open task1',
  },
]

const chatHistory = [
  {
    topicId:1,
    class2: 'message-data ',
    circle: 'fa fa-circle me',
    classmessage:'message my-message',
    messageTime: '10:10 AM, Today',
    messageName: 'AAA',
    messageData: 'Hi Vincent, how are you? How is the project coming along?'
  },
  {
    topicId:1,
    class2: 'message-data align-right',
    circle: 'fa fa-circle online',
    classmessage:"message other-message float-right",
    messageTime: '10:10 AM, Today',
    messageName: 'BBB',
    messageData: 'Hi Vincent, how are you? How is the project coming along?'
  },
  {
    topicId:1,
    class2: 'message-data align-right',
    circle: 'fa fa-circle online',
    classmessage:"message other-message float-right",

    messageTime: '10:14 AM, Today',
    messageName: 'CCC',
    messageData: ' Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?'
  },
  {
    topicId:1,
    class2: 'message-data align-right',
    circle: 'fa fa-circle online',
    classmessage:"message other-message float-right",
    messageTime: '10:19 AM, Today',
    messageName: 'DDD',
    messageData: 'Actually everything was fine. Im very excited to show this to our team.'
  },
  {
    topicId:1,
    class2: 'message-data align-right',
    circle: 'fa fa-circle online',
    classmessage:"message other-message float-right",
    messageTime: '10:20 AM, Today',
    messageName: 'EEE',
    messageData: 'Hi Vincent, how are you? How is the project coming along?'
  },
  {
    topicId:2,
    class2: 'message-data',
    circle: 'fa fa-circle online',
    classmessage:'message my-message',
    messageTime: '10:30 AM, Today',
    messageName: 'FFF',
    messageData: 'Hi Vincent, how are you? How is the project coming along?'
  },
  {
    topicId:2,
    class2: 'message-data align-right',
    circle: 'fa fa-circle online',
    classmessage:"message other-message float-right",
    messageTime: '10:20 AM, Today',
    messageName: 'EEEsss',
    messageData: 'Hi Vincent, how are you? How is the project coming along?'
  },
  {
    topicId:2,
    class2: 'message-data',
    circle: 'fa fa-circle online',
    classmessage:'message my-message',
    messageTime: '10:30 AM, Today',
    messageName: 'FFF',
    messageData: 'Hi Vincent, how are you? How is the project coming along?'
  },
]

function TodoWatsApp () {
  const [currentTopic,setCurrentTopic]=useState('all');
  const [currentChatHistory,setCurrentChatHistory]=useState(chatHistory);
  const time = now();
  //  const [currentTopic,setCerruntTopic]=useState(0);
   const handleTopic=(id)=>{
     debugger
    setCurrentTopic(id);
    if(id==='all')
    setCurrentChatHistory(chatHistory);
    else{
      setCurrentChatHistory(chatHistory.filter((item)=>(item.topicId===id)))
    }
   
     //fix bug not show  משימות אישיות 
     //change cout chat
     //change header of chat
     //chnage height
     // add ALL button
     //chnge current folder to open icon
   }

  
  return (
    <div className='todo' >
      <div className="container clearfix">
        <div className="people-list" id="people-list">
          <div className="search">
            <input type="text" placeholder="search" />
            <i className="fa fa-search"></i>
          </div>
          <ul className="list">
            {topics.map((topic, index) => (
              <li className="clearfix" key={index * 117} onClick={()=>{handleTopic(topic.id)}}>
                <img src={topic.src} />
                <div className="about">
                  <div className="name">{topic.topicName}</div>
                  <div className="status">

                    <i className={'fa fa-circle'+' '+(currentTopic==='all' || topic.id===currentTopic?'online':null)}></i>{topic.statusData}


                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>


        <div className="chat">
          <div className="chat-header clearfix">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==" />
            <div className="chat-about">
              <div className="chat-with">משימות ABC</div>
              <div className="chat-num-messages">already 1 902 messages</div>
            </div>
            <i className="fa fa-star"></i>
          </div>

          <div className="chat-history">
            <ul className="list">
              {currentChatHistory.map((item, index) => (
                <li className='clearfix' key={index * 217}>
                  <div className={item.class2}>
                    <span className="message-data-time" >{item.messageTime}</span> &nbsp; &nbsp;
                    <span className="message-data-name" >{item.messageName}</span> <i className={item.circle}></i>
                  </div>
                  <div className={item.classmessage}>
                    {item.messageData}
                  </div>
                </li>
              ))}
  
            </ul>
          </div>
          <div className="chat-message clearfix">
            <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o"></i>
            <button>Send</button>
          </div>
        </div>
      </div>



      <RecoilRoot>
        <div className="mainTodo">
          <h1 className="headerTodo"> Todos </h1>
          <div className="listTodo">
            <Todos />
            <AddTodo />
          </div>
        </div>
      </RecoilRoot>
    </div>
  )

}

export default TodoWatsApp;
