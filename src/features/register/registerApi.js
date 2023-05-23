import axios from 'axios'
import { url } from "../../utils/url.js"
export const createUser = async (username, email, password) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.post(`${url}/register`, { username,email, password }, config)  
        console.log(data)
    
        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}