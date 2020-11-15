
export const pageimEndPoint = () => {
    
    // if(window.origin==null)
    //     fetch(window.location.origin + '/serverurl.json')
    //     .then(res=>{
    //         window.urlName = res.url;
    //     });
    // else
      return 'http://'+window.location.hostname+':8080';

}
export const configHeader = () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return config;
}