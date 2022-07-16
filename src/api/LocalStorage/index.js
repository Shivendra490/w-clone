import { isFocusable } from "@testing-library/user-event/dist/utils"

const WAPPUSERID='WAPPUSERID'

const getUserDetails=()=>{
    
    const userDetails=localStorage.getItem(WAPPUSERID)
    if(userDetails){
        return JSON.parse(userDetails)
    }
    return ""
}

const setUserId=(id)=>{
    
    localStorage.setItem(WAPPUSERID,JSON.stringify(id))
    
}

export {getUserDetails,setUserId}