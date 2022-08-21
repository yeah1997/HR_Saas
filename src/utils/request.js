import axios from "axios";
import store from "@/store";
import router from "@/router";
import { Message } from "element-ui";

import { getTimeStamp } from '@/utils/auth'

const TimeOut = 3600   // Time for Token timeout

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,  // Developer Mode: /api
    timeout: 10000
})

// interceptors request
service.interceptors.request.use((config) => {
    // Set Config
    if (store.getters.token) {
        
        // Token Time Out 
        if(isCheckTokenTimeOut()) {
            store.dispatch('user/logout')
            router.push('/login')

            return Promise.reject(new Error('Token is Time out'))
        }

        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
}, (err) => {
    Message.error(err.message)
    console.log(err);
    return Promise.reject(err) //Throw Err
})

// interceptors response
service.interceptors.response.use((res) => {
    const { data, message, success } = res.data

    // Is it Successful?
    if (success) {
        return data
    } else {
        Message.error(message)
        return Promise.reject(new Error(message))
    }
}, (err) => {

    if(err.response && err.response.data && err.response.data.code === 1003) {
        store.dispatch('user/logout')
        router.push('/')
        Message.error('Token is Time out')
    }else {
        Message.error(err.message)
        
    }
    console.log("123", err);
    store.dispatch('user/logout')
    router.push('/')
    return Promise.reject(err)  // Throw Err

})

// **********************************************

function isCheckTokenTimeOut() {
    let currentTime = Date.now()
    let timeStamp = getTimeStamp()

    return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service