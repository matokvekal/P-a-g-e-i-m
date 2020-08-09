import React, { useState, useEffect } from 'react';
import './TodoWatsApp.css';
import { now } from 'moment';
import { atom, useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import AddItem from './AddItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CheckIcon from '@material-ui/icons/Check';
import Switch from '@material-ui/core/Switch';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';

const imgFolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRYhWNgGAWjYGABIwMDA4N7x/H/xGpgZWbq21JqXkw7J6ECFhgjP8ScoOLvP38zrNp/Ld275yTj1hLzIpq6DAqYSFHMyc7KEOaoxc3DwZbm3XOyj1aOQgbwKCYmBGHg/advDGsOXf/77ccfZpq5jIGBYWeFJSMLYWWo4PaTtwyHLjxkMFISYg6zkmdgYyEpEogGGTNOMjAwIKXBiWtOEqVRXICTIdtTjUFRnIcmDkMHcAfOyCA+iukJaBM/VASjDqQUjDqQUjDqQErBqAMpBaMOpBSMOpBSMOpASsGoAykFow6kFIw6kFIw6kBKwaB3ILzjDhtqGAWjYBSgAgAXxS82HNeMiAAAAABJRU5ErkJggg==";
let result = [
  {
    id: 1,
    type: 'topic',
    rating: 0,
    topicName: 'WELCOME',
  },
  // {
  //   id: 2,
  //   type: 'topic',
  //   rating: 0,
  //   topicName: 'באגים',
  // },
  // {
  //   id: 3,
  //   type: 'topic',
  //   rating: 0,
  //   topicName: 'משימות אישיות',
  // },
  // {
  //   id: 4,
  //   type: 'topic',
  //   rating: 0,
  //   topicName: 'קניות',
  // },
  // {
  //   id: 5,
  //   type: 'topic',
  //   rating: 0,
  //   topicName: 'דחוף',
  // },
  // {
  //   id: 6,
  //   type: 'topic',
  //   rating: 0,
  //   topicName: 'פיתוח עתידי',
  // },
  // {
  //   id: 7,
  //   type: 'topic',
  //   rating: 0,
  //   topicName: 'בית ספר',
  // },
  // {
  //   id: 8,
  //   type: 'topic',
  //   rating: 0,
  //   topicName: 'סרטים',
  // },
  // {
  //   id: 9,
  //   type: 'topic',
  //   rating: 0,
  //   topicName: 'לתקן',
  // },
  // {
  //   id: 10,
  //   type: 'topic',
  //   rating: 0,
  //   topicName: 'אימונים',
  // },
  {
    id: 11,
    type: 'chat',
    parent: 1,
    class2: 'message-data ',
    classmessage: 'message my-message',
    messageTime: '10:10 AM, Today',
    messageData: 'This  is your first message, it can be deleted , then you can delete the folder too',
    isComplite: true,
    deleted: false,
  },
  // {
  //   id: 12,
  //   type: 'chat',
  //   parent: 1,
  //   class2: 'message-data ',
  //   classmessage: 'message my-message',
  //   messageTime: '10:10 AM, Today',
  //   messageData: 'alesuada nec. <br/>Vestibulum non sem accumsan,<br/>feugiat leo non, dictum eros. Suspendisse potenti. Proin nunc nisi, faucibus sit amet vehicula vel, faucibus in lorem. Ut porta commodo felis vel mattis. Pellentesque nec ex ex. Ut congue eros ut ultricies sodales. Ut porta tristique porttito',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 13,
  //   type: 'chat',
  //   parent: 5,
  //   messageTime: '10:10 AM, Today',
  //   messageData: 'Phasellus hendrerit consequat iaculis. ',
  //   isComplite: true,
  //   deleted: false,
  // },
  // {
  //   id: 14,
  //   type: 'chat',
  //   parent: 3,
  //   classmessage: "message other-message float-right",
  //   messageTime: '10:14 AM, Today',
  //   messageData: ' Morbi accumsan facilisis tellus, eget sodales erat.<br/>Phasellus ut risus vel \r\nnibh ultrices fermentum. Pellentesque luctus nulla nec nulla ornare, nec lobortis neque sodalesMorbi blandit justo vel dui feugiat, sed placerat lacus consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla faucibus neque in porta gravida. Mauris sed lacus nec magna interdum gravida. Duis    tristique velit a ipsum aliquam iaculis. Proin ac nulla metus?',
  //   isComplite: true,
  //   deleted: false,
  // },
  // {
  //   id: 15,
  //   type: 'chat',
  //   parent: 2,
  //   messageTime: '10:19 AM, Today',
  //   messageData: 'Phasellus ut risus vel nibh ultrices',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 16,
  //   type: 'chat',
  //   parent: 1,
  //   messageTime: '10:20 AM, Today',
  //   messageData: 'הוספת טופיק',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 17,
  //   type: 'chat',
  //   parent: 3,
  //   messageTime: '10:30 AM, Today',
  //   messageData: 'accumsan, egestas eu mi.<br/>Cras i?',
  //   isComplite: true,
  //   deleted: false,
  // },
  // {
  //   id: 18,
  //   type: 'chat',
  //   parent: 2,
  //   messageTime: '10:20 AM, Today',
  //   messageData: 'Hi accumsan,"<br />" egestas eu mi. Cras i?"<br />" Hi accumsan, egestas <br/>eu mi. Cras   \r\n Hi accumsan, egestas eu mi. Cras ',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 19,
  //   type: 'chat',
  //   parent: 1,
  //   messageTime: '10:20 AM, Today',
  //   messageData: 'קומפלימנטים',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 20,
  //   type: 'chat',
  //   parent: 1,
  //   messageTime: '10:20 AM, Today',
  //   messageData: ' מחיקות',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 21,
  //   type: 'chat',
  //   parent: 1,
  //   messageTime: '10:20 AM, Today',
  //   messageData: ' עדכון גובה',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 22,
  //   type: 'chat',
  //   parent: 1,
  //   messageTime: '10:20 AM, Today',
  //   messageData: 'local storage',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 23,
  //   type: 'chat',
  //   parent: 1,
  //   messageTime: '10:20 AM, Today',
  //   messageData: 'מיון קטגוריות לפי שימוש',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 24,
  //   type: 'chat',
  //   parent: 1,
  //   messageTime: '10:20 AM, Today',
  //   messageData: 'שיתוף',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 25,
  //   type: 'chat',
  //   parent: 1,
  //   messageTime: '10:20 AM, Today',
  //   messageData: ' chat-history rtl ltr עדכון למובייל',
  //   isComplite: false,
  //   deleted: false,
  // },
  // {
  //   id: 26,
  //   type: 'chat',
  //   parent: 1,
  //   messageTime: '10:20 AM, Today',
  //   messageData: 'סטטיסטיקה-היו לך 200 משימות, מבצע 1 ביוםת זמן ממוצע למשימה יומיים',
  //   isComplite: false,
  //   deleted: false,
  // },
]



// window.localStorage.setItem('data', JSON.stringify(data));
if (localStorage['data']) {
  result = JSON.parse(localStorage['data']);
};

export const dataState = atom({
  key: "data",
  default: result,
});
export const statusComplite = atom({
  key: "statusComplite",
  default: 'open',
});
function TodoWatsApp() {
function setLocalStorage(dataToStore){
  window.localStorage.setItem('data', JSON.stringify(dataToStore));
}
  const toggleTodo = (id) => {
    setData((data) => {
      try {
        const newData = data.map((item, i) => {
          if (item.id === id) {
            return {
              ...item,
              isComplite: !item.isComplite,
            };
          } else {
            return item;
          };
        });
        return newData;
      } catch (error) {
        console.log(error);
      }
    });
    setTriger(Date.now());
  };
  // debugger
  const [radioSelect, setRadioSelect] = useRecoilState(statusComplite);

  const data = useRecoilValue(dataState);
  const setData = useSetRecoilState(dataState);
  const [currentTopic, setCurrentTopic] = useState('All');
  const time = now();
  const [header, setHeader] = useState('All');
  const [taskCount, setTaskCount] = useState(0);
  const [openTaskCount, setOpenTaskCount] = useState(0);
  const [triger, setTriger] = useState();
  const [folderName, setFolderName] = useState('');
  const [direction, setDirection] = useState('ltr');
  const [searchVal, setSearchVal] = useState('');
  function getMaxId() {
    const maxValueOfY = Math.max(...data.map(o => o.id), 0);
    return maxValueOfY;
  }
  function changeDirection() {
    setDirection(dir => (direction === 'ltr' ? 'rtl' : 'ltr'));
  }
  function changeSearch(event) {
    setSearchVal(event.target.value);
    changeTopic('All');
    setHeader('Search...')
  };
  const changeTopic = (id) => {
    setCurrentTopic(id);
    try {
      if (id === 'All') {
        setHeader('All');
        setTriger(Date.now());
      }
      else {
        const topic = data.filter(item => (item.type === 'topic')).filter(item => (item.id === id));
        const tasks = data.filter(item => (item.type === 'chat')).filter((item) => (item.parent === id));

        setHeader(topic[0].topicName);
        setTriger(Date.now());
        updateRating(id);
        setSearchVal('');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deleteFolder = (id) => {
    debugger
    try {
      if (id === 'All' || taskCount !== 0)
        return;
      else {
        setData((data) => {
          const newData = data.filter((item) => item.id !== id);setLocalStorage(newData); return newData;
        });
        
        window.location.reload();

      }
    } catch (error) {
      console.log(error);
    }
  }
  const newFolder = (event) => {
    event.preventDefault();
    try {
      if (!folderName.length) return;
      setData((oldData) => {
        const newData = [...data, {
          id: getMaxId() + 1,
          type: 'topic',
          rating: 0,
          topicName: folderName,
        }];
        setFolderName('');
        return newData;
      });
     
    } catch (error) {
      console.log(error);
    }
  }



  const updateRating = (id) => {
    try {
      setData((data) => {
        const newData = data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              rating: Number(item.rating + 1),
            };
          } else {
            return item;
          };
        });
        setLocalStorage(newData);
        return newData;
      });
    } catch (error) {
      console.log(error);
    }
  }
  function handleDelete(id) {
    setData((data) => {
      const newData = data.filter((item) => item.id !== id); setLocalStorage(newData);return newData;
    });
  }
  function countItems(id) {
    try {
      if (searchVal) {
        setTaskCount(data.filter(item => (item.type === 'chat')).filter(item => (item.messageData.includes(searchVal))).length);
        setOpenTaskCount(data.filter(item => (item.type === 'chat')).filter(item => (!item.isComplite)).filter(item => (item.messageData.includes(searchVal))).length);
      }
      else if (id === 'All') {
        setTaskCount(data.filter(item => (item.type === 'chat')).length);
        setOpenTaskCount(data.filter(item => (item.type === 'chat')).filter(item => (!item.isComplite)).length);
      }
      else {
        const tasks = data.filter(item => (item.type === 'chat')).filter((item) => (item.parent === id));
        setTaskCount(tasks.length);
        setOpenTaskCount(tasks.filter(item => (!item.isComplite)).length);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    countItems(currentTopic);
  }, [triger])

  function handleFolderName(event) {
    setFolderName(event.target.value);
  }

  return (
    <div className='todo' >
      <div className="container clearfix">
        <div className="folder-list" id="folder-list">
          <div className="search">
            <Input className="searchInput" type="text" placeholder="search" value={searchVal} onChange={changeSearch} />
          </div>
          <Button type="primary" className="selectAllButton" onClick={() => { changeTopic('All') }}>select All</Button>

          <ul className="list">
            {data.filter(item => (item.type === 'topic')).sort((a, b) => (a.rating > b.rating) ? -1 : 1).map((topic, index) => (
              <li className="clearfix" key={index * 117} onClick={() => { changeTopic(topic.id) }} onDoubleClick={() => { deleteFolder(topic.id) }}>
                <img src={imgFolder} />
                <div className="about">
                  <div className="isComplite">
                    <i className={'fa fa-circle' + ' ' + (currentTopic === 'All' || topic.id === currentTopic ? 'online' : null)}></i>
                  </div>
                  <div className="name" >{topic.topicName}</div>

                </div>
              </li>
            ))}
          </ul>

        </div>


        <div className="chat">
          <div className="chat-header clearfix">

            <div className="chat-about">
              <div className="chat-with">{header}</div>
              <div className="chat-num-messages"> {taskCount} tasks {openTaskCount} open</div>
              <span className="chat-message"> Only {openTaskCount} to go! well done </span>
            </div>
            <div>
              <RadioGroup row aria-label="position" name="position" defaultValue="top">

                <FormControlLabel
                  value="all"
                  control={<Radio color="primary" />}
                  label="all"
                  labelPlacement="all"
                  checked={radioSelect === 'all' ? 'checked' : null}
                  onClick={() => setRadioSelect('all')}
                />
                <FormControlLabel
                  value="open"
                  control={<Radio color="primary" />}
                  label="open"
                  labelPlacement="all"
                  checked={radioSelect === 'open' ? 'checked' : null}
                  onClick={() => setRadioSelect('open')}


                />
                <FormControlLabel
                  value="Is Complite"
                  control={<Radio color="primary" />}
                  label="Complite"
                  labelPlacement="all"
                  checked={radioSelect === 'isComplite' ? 'checked' : null}
                  onClick={() => setRadioSelect('isComplite')}


                />

              </RadioGroup>
            </div>
            <i className={direction === 'ltr' ? 'fas fa-chevron-left' : 'fas fa-chevron-right'} onClick={changeDirection}></i>
          </div>

          <div className={'chat-history ' + direction}>
            <ul className="list">
              {taskCount != 'All' && taskCount === 0 ? <h3>If folder is empthy you can delete it by clicking twice over folder icon!</h3> : null}
              {
                data.filter(item => (item.type === 'chat'))
                  .filter((item) => (searchVal ? (item.messageData).includes(searchVal) : currentTopic === 'All' ? item : item.parent === currentTopic))
                  .filter((item) => (radioSelect === 'isComplite' ? item.isComplite : radioSelect === 'open' ? !item.isComplite : item))

                  .map((item, index) => (
                    <li className='clearfix' key={index * 217}>
                      <div className='message-data '><span title='delete!' onClick={() => (handleDelete(item.id))}>X</span>
                        <span className="message-data-time" >{item.messageTime}</span>&nbsp; &nbsp;
                    <input className='todoCheck'
                          type="checkbox"
                          id="todo"
                          checked={item.isComplite}
                          onChange={() => {
                            toggleTodo(item.id);
                          }}
                        />
                      </div>
                      <div className={item.isComplite === true ? "message green-message float-right" : "message blue-message float-left"}>
                        {item.messageData}
                      </div>

                    </li>
                  ))}

            </ul>
          </div>
          <AddItem id={currentTopic} />
        </div>

      </div>
      <div className='footer'>
        <Button type="primary" className="addButton" onClick={newFolder}>Add</Button>
        <Input className='addFolder' maxlength="15"
          type="text"
          id="addFolder"
          placeholder='Folder name'
          value={folderName}
          onChange={handleFolderName}
        />
      </div>
    </div>
  )

}

export default TodoWatsApp;
