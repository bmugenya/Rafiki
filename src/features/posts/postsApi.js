import axios from 'axios'
import { url } from "../../utils/url.js"

export const getPosts = async () => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/posts`, config)  

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}


export const addPost = async (text,email) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.post(`${url}/post`,{text,email}, config) 
        console.log(data) 

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}