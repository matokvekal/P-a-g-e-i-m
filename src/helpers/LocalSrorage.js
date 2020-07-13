
export const UseLocalStorage = (type, key, value) => {
    try {
        if (!key )
            return "key  must be set";
        if (type === 'set') {
            if (!value)
                return "value  must be set";
            // debugger
            alert('localStorage.js')    
            window.localStorage.setItem(key, JSON.stringify(value));
            return "ok";
        }
        else
            return window.localStorage.getItem(key);
    }
    catch (error) {
        console.log(error);
        return "error";
    }

}
