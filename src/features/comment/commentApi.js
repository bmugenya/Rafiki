import axios from 'axios'
import { url } from "../../utils/url.js"

export const getComment = async (post_id) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/comments/${post_id}`, config)  
        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}


export const addComment = async (text,email,post_id) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.post(`${url}/comment/${post_id}`,{text,email,post_id}, config) 
        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}