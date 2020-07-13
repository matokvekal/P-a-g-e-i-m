
export const pageimEndPoint = () => {
    return 'http://104.248.161.10:8080';
}

export const configHeader = () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return config;
}