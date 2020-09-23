
// export const pageimEndPoint = () => {
//     return 'http://anan.systems';
// }
export const pageimEndPoint = () => {
    return 'http://localhost:8080';
    //return 'http://109.207.76.127:8080';
}
export const configHeader = () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return config;
}