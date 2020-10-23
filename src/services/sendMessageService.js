// import axios from 'axios';
import { pageimEndPoint } from '../Config';
import deviceIdentity from '../helpers/Helpers';
// const API_ENDPOINT = pageimEndPoint();
export const addNewRow = (row, url) => {
  if (localStorage['messages_trys'])
    if (Number(localStorage['messages_trys']) > 5 && localStorage['messages_last_trys'] && localStorage['messages_last_trys'] > (Date.now() - 120 * 60 * 1000)) {
      alert('eturn')
      return
    }

    else {
      localStorage['messages_trys'] = Number(localStorage['messages_trys']) + 1;
      localStorage['messages_last_trys'] = Date.now();
    }
  else {
    localStorage['messages_trys'] = 1;
    localStorage['messages_last_trys'] = Date.now();
  }


  if (!deviceIdentity())
    return
  let APP = window.location.pathname.toString();
  APP = APP ? APP.substr(1).toLowerCase() : '';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', Authorization: "Bearer " + localStorage['deviceIdentity']
    },
    body: JSON.stringify({
      data: row,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success === 'true')
        return result
    })
    .catch((err) => console.log('error'))


}


