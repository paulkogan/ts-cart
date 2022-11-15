
import {useState} from 'react'

// need to figure out how this works

const getStoredValue = (key) => {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) {
        return savedValue
    } else {
        return null
    }
}

// this only needs to return the value and a function to save the value
//is this teh value for any key or a specific key
const useLocalStorage = (key, value) => {
    const [value, storeValue] = useState({key: value})

    useEffect (() => {
        localStorage.setItem(key,JSON.stringify(value))

    }, [value])


    return [value, storeValue]
}

export default useLocalStorage