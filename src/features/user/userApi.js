import axios from 'axios'
import { url } from "../../utils/url.js"

export const  authUser = async (email, password) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.post(`${url}/login`, { email, password }, config)   
        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}