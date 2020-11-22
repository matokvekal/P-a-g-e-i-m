import React, { useContext, useEffect, useState } from 'react';
import { FilterContext } from './../context/FilterContext';
// import smsAuth from './smsAuth.css';
import { atom, useRecoilState } from 'recoil';
import welcomeModal from './welcomeModal.css';
// import useCustomefetch from './../../../hooks/useCustomFetch';
// import { pageimEndPoint } from '../../../Config';
// import deviceIdentity from '../../../helpers/Helpers';
//import takanon from '../../../assets/documents/takanonnovember.pdf';
import takanon from '../assets/documents/takanonnovember.pdf';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import deviceIdentity from './/Helpers';

import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Timer from './Timer';

import { pageimEndPoint } from '../Config';

const WelcomeModal = () => {
   const API_ENDPOINT = pageimEndPoint();

   // const { closeModal, submitLogin, submitPassword, inputMobileNumber, inputPersonalName, inputPassword, mobileNumber, personalName, password } = useLogin();
   const [closeModal, setCloseModal] = useState('true');
   const welcomeModal = atom({
      key: "_WelcomeModal",
      default: {
         formType: '',
         active: false,
         message: '<p></p>',
      },
   });
   const Query = atom({
      key: "_critQuery",
      default: "",
   });
   const newFilter = atom({
      key: "_filterState",

      default: "",
   });
   const [filters, setFilters] = useContext(FilterContext);
   const [filter, setFilter] = useRecoilState(newFilter);
   const [anyQuery, setAnyQuery] = useRecoilState(Query);
   const [modalWelcome] = useRecoilState(welcomeModal);
   const [show, setShow] = useState(true);
   const [index, setIndex] = useState(0);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
   };
   const[checkBox,setCheckbox]=useState('false');
   const [events, setEvents] = useState({});
   const [headers, setHeaders] = useState({ header1: null, header2: null });
   const [welcomeFilter, setWelcomeFilter] = useState([]);
   const spinners = [
           ,"secondary"
      , "success"
      , "danger"
      , "warning"
      , "info"
      , "light"
      , "dark",
      "primary",

   ]
   const handleCeckbox=(e)=>{
      let y = e.target.checked;
      localStorage['hideWelcome']='true';
     //debugger
   //   /handleClose();
   }
   useEffect(() => {
      if(localStorage['hideWelcome']==='true')
         handleClose();
      let APP = window.location.pathname.toString();
      APP = APP ? APP.substr(1).toLowerCase() : '';
      if (!APP || !deviceIdentity())
         return

      const URL = `${API_ENDPOINT}/pageim/getWelcome?appname=${APP}`;
      fetch(URL, {
         method: 'GET',
         headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
      }
      )
         .then(response => {
            return response.json()
         })
         .then(data => {
            //debugger
            if (data && data.data && data.data.length > 0) {
               setEvents(data.data)
            };
            if (data && data.welcome && data.welcome.length > 0) {
               setHeaders({ header1: data.welcome[0].header1, header2: data.welcome[0].header2 })
               setWelcomeFilter(data.welcomeFilter[0].welcomeFilter.split(','))
            }
         })
         .catch((error) => {
            console.error('Error:', error);
         });

   }, []);
   function selectEvent(name, value) {
      //debugger
      setAnyQuery('true');
      handleClose();
      setFilter({
         checked: true,
         name: name,
         value: value,
      });
   }

   return (

      <div >

         <Modal show={show} onHide={handleClose} animation={false}  >
            <div className='modatWelcome'>
               <Modal.Title >{headers && headers.header1 && <h1 className="text_header">{headers.header1}</h1>}</Modal.Title>


               {headers && headers.header2 && <p className="text_center">{headers.header2}</p>}
               <Modal.Body >
                  <Carousel activeIndex={index} onSelect={handleSelect}>
                     {events && events.length > 0 && events.map((event, index) => (
                        <Carousel.Item key={index}>
                           <>
                              <Alert show='true' variant="success" onClick={() => { selectEvent('event_id', event.event_id) }}>
                                 <Alert.Heading className="text_header"> <p className="text_header"> {event.event_name}  </p></Alert.Heading>
                                 <p className="text_header"> {event.year} </p>
                                 <p className="text_center">   {`  משתתפים ${event.participents}  `}  </p>
                                 {/* <hr /> */}
                                 <div className="d-flex justify-content-end">
                                    <Spinner animation="grow" variant={spinners[Math.floor(Math.random() * spinners.length)]} size='sm' />
                                 </div>
                              </Alert>
                           </>
                        </Carousel.Item>
                     ))   }
                  </Carousel>
                  <div className='selectArea'>
                     {welcomeFilter && welcomeFilter.length > 0 && welcomeFilter.slice(0, 4).map((filter, index) => (

                        <DropdownButton className='DropdownButton' id="dropdown-basic-button" size="lg" title={filter} as={ButtonGroup} key={index+999} variant={spinners[index]}>
                           {filters.filter(item => item.field === filter).slice(0, 5).map((item, index1) => (
                              <Dropdown.Item href="#" onSelect={() => { selectEvent(item.field, item.data) }}key={index1+9999}>{item.data}</Dropdown.Item>
                           ))}
                        </DropdownButton>
                     ))}

                     <Button variant="primary" className='DropdownButton' onClick={handleClose} as={ButtonGroup} size="lg" >
                        כל התוצאות
                  </Button>
                  </div>
               </Modal.Body>
               <Modal.Footer >
                  <div className='footer1'>
     
                     <div>
                        <input className="checkbox agree" type="checkbox" onChange={handleCeckbox}/>

                        <span target='blank' >אל תציג יותר</span>
                     </div>

                  </div>
               </Modal.Footer>

            </div>
         </Modal>

         <br />
         {/* </div> */}
      </div>
   )
}

export default WelcomeModal;