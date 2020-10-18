// import getApp from './Helpers';
// import deviceIdentity from './Helpers';

// import { pageimEndPoint } from '../Config';

// const API_ENDPOINT = pageimEndPoint();


// function UpdateLike(id) {

//   // if (app === '/' || app === '/Templates' || !id)
//   //   return
//   let APP = window.location.pathname.toString();
//   APP = APP ? APP.substr(1).toLowerCase() : '';

//   if (!deviceIdentity())
//     return
//   if (id) {
//     const URL = `${API_ENDPOINT}/pageim/likesUpdate?appname=${APP}&id=${id}`;
//     fetch(URL, {
//       method: 'POST',
//       headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
//     })
//       .then(response => {
//         return response.json();
//       })
//       .then(res => {
//         if (res && res.success)
//           return true;
//         else
//           return false;
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }
// }
// export default UpdateLike;