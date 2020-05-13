export const apiEndPoint1 = () => {
    return 'https://hn.algolia.com/api/v1';
}
export const PageimEndPoint = () => {
    return 'http://yonaswr.com/files';
}
export const configHeader = () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return config;
}