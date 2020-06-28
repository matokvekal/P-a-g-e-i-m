import React,{useEffect,useState} from 'react';
import axios from 'axios';




export const ServerPagePost = () => {
  const [data, setData] = useState([]);

   useEffect(() => {
    // console.log('serverPagePost   useEffect 11')
     //axios.all([
  //   axios.get('https://api.github.com/users/mapbox'),
  //   axios.get('https://api.github.com/users/phantomjs')
  // ])
  // .then(axios.spread((user1, user2) => {
  //   console.log('Date created: ', user1.data.created_at);
  //   console.log('Date created: ', user2.data.created_at);
  // }));

//   axios.post('/login', {
//     firstName: 'Finn',
//     lastName: 'Williams'
//   })
//   .then((response) => {
//     console.log(response);
//   }, (error) => {
//     console.log(error);
//   });
// const options = {
//     method: 'post',
//     url: '/login',
//     xsrfCookieName: 'XSRF-TOKEN',
//     xsrfHeaderName: 'X-XSRF-TOKEN',
//   };
  
//   // send the request
//   axios(options);


    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => setData(data));
  });

  return (
    <div>
      <ul>
        {data.map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  );
}
 
export default ServerPagePost;
