
export const UseLocalStorage = (type, key, value) => {
    try {
        // console.log("at ls")
        if (!key )
            return "key  must be set";
        if (type === 'set') {
            if (!value)
                return "value  must be set";
            debugger
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


// function useLocalStorage(key, initialValue) {
//     const [storedValue, setStoredValue] = useState(() => {
//         try {
//             const item = window.localStorage.getItem(key);
//             return item ? JSON.parse(item) : initialValue;
//         } catch (error) {
//             console.log(error);
//             return initialValue;
//         }
//     });

//     const setValue = value => {
//         try {
//             const valueToStore =
//                 value instanceof Function ? value(storedValue) : value;
//             setStoredValue(valueToStore);
//             window.localStorage.setItem(key, JSON.stringify(valueToStore));
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return [storedValue, setValue];
// }