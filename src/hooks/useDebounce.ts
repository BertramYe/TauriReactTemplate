import { useState } from "react";

const useDebounce =  <T,>(callback:ICallBack<T>,delay:number= 1000) => {
    const [timeOutId,setTimeOutID] = useState<NodeJS.Timeout>()
    return (...argrs:T[]) => {
        clearTimeout(timeOutId);
        const newtimeOutId = setTimeout(()=> {
            callback(...argrs)
        },delay)
        if(newtimeOutId){
            setTimeOutID(newtimeOutId)
        }
    }
}

export default useDebounce