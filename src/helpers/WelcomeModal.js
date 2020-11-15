import React, {useEffect, useState } from 'react';
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
   const [modalWelcome] = useRecoilState(welcomeModal);
   const [show, setShow] = useState(true);
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
   };
   const [data,setData]=useState({
      mainHeader:'',
      secondaryHeader:'',
      participents:'',
      year:'',
      raceList:[]
   })
   useEffect(() => {
      //debugger
      let APP = window.location.pathname.toString();
      APP = APP ? APP.substr(1).toLowerCase() : '';
      if (!APP ||!deviceIdentity())  
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
         // debugger
         //  return setMenuList(data.appsresult[1])
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  
      // }, [app]);  old
    }, []);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   return (
      // <div className={`welcome card__item ${modalWelcome.active ? 'active' : null}`} id="popup">
      // <div className={`welcome card__item ${1==1 ? 'active' : null}`} id="popup">
      <div >
         {/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
      </Button> */}

         <Modal show={show} onHide={handleClose} animation={false}  >
            <div className='modatWelcome'>
               <Modal.Title ><h1 className="text_header">לוח תוצאות אישיות במרוצי אופנים</h1></Modal.Title>


               <p className="text_center"> חיתוך לפי: שנה, קטגוריה, תוצאה ועוד אלפי תוצאות </p>
               <Modal.Body >
                  <Carousel activeIndex={index} onSelect={handleSelect}>
                     <Carousel.Item>
                        <>
                           <Alert show='true' variant="success">
                              <Alert.Heading className="text_header"> <p className="text_header"> מרוץ בית גוברין   </p></Alert.Heading>
                              <p className="text_header"> 2020   </p>
                              <p className="text_center">  משתתפים   1000</p>
                              {/* <hr /> */}
                              <div className="d-flex justify-content-end">
                                 <Button variant="link" > בחר  </Button>
                              </div>
                           </Alert>
                        </>
                     </Carousel.Item>
                     <Carousel.Item>
                        <>
                           <Alert show='true' variant="success">
                              <Alert.Heading className="text_center"><p className="text_header"> מרוץ הולודרום ה1 </p>  </Alert.Heading>

                              <p className="text_header"> 2020   </p>
                              {/* <hr /> */}
                              <div className="d-flex justify-content-end">
                                 <Button variant="link"> בחר  </Button>      <Spinner animation="grow" variant="light" />
                              </div>
                           </Alert>
                        </>
                     </Carousel.Item>
                     <Carousel.Item>
                        <>
                           <Alert show='true' variant="success">
                              <Alert.Heading className="text_center"><p className="text_header"> דרוג שנתי    </p></Alert.Heading>
                              <p className="text_header"> 2020   </p>
                              {/* <hr /> */}
                              <div className="d-flex justify-content-end">
                                 <Button variant="link"> בחר  </Button>
                              </div>
                           </Alert>
                        </>
                     </Carousel.Item>
                     <Carousel.Item>
                        <>
                           <Alert show='true' variant="success">
                              <Alert.Heading className="text_center"><p className="text_header">דרוג שנתי    </p> </Alert.Heading>
                              <p className="text_header"> 2019  </p>
                              {/* <hr /> */}
                              <div className="d-flex justify-content-end">
                                 <Button variant="link"> בחר  </Button>
                              </div>
                           </Alert>
                        </>
                     </Carousel.Item>
                  </Carousel>
                  <div className='selectArea'>
                     <DropdownButton className='DropdownButton' id="dropdown-basic-button" size="lg" title="שנה" as={ButtonGroup} >
                        <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
                     </DropdownButton>
                     <DropdownButton className='DropdownButton' id="dropdown-basic-button" size="lg" title="קטגוריה" as={ButtonGroup} >
                        <Dropdown.Item href="#/action-1">עילית גברים</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">עילית נשים</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">רמה 1</Dropdown.Item>
                     </DropdownButton>
                     <Button variant="primary" className='DropdownButton' onClick={handleClose} as={ButtonGroup} size="lg" >
                        כל התוצאות
                  </Button>
                  </div>
               </Modal.Body>
               <Modal.Footer >
                  <div className='footer1'>
                     <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                     {/* <input className="checkbox" type="checkbox" value='אל תציג יותר' /><p>אל תציג יותר</p> */}
                     <div>
                     <input className="checkbox agree" type="checkbox"  />

                     <span href = '#' target='blank'>אל תציג יותר</span>
                     </div>

                  </div>
               </Modal.Footer>

            </div>
         </Modal>
         {/* <Card border="primary" style={{ width: '18rem' }} className={`welcome card__item ${1==1 ? 'active' : null}`} id="popup">
    <Card.Header>Header</Card.Header>
    <Card.Body>
      <Card.Title>Primary Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card> */}
         <br />
         {/* </div> */}
      </div>
   )
}

export default WelcomeModal;