import axios from 'axios'
// import { url } from "./utils/url.js"

const url = 'https://rafiki.onrender.com'

export const createUser = async (username, email, password) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.post(`${url}/api/register`, { username,email, password }, config)  
        console.log(data)
    
        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}