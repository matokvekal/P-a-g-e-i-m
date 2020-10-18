

function Get(url){
   return fetch(url, {
      method: 'GET',
      headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
    })
}


function Post(url){
return fetch(url, {
   method: 'POST',
   headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
 })
}



export default {Post,Get};