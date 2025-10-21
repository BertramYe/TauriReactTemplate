import { useMemo, useState } from "react";


type TThrottleOptions = {
  triggerType:'leading' | 'tailing'
}

const useThrottle = <T,>(callback: ICallback<T>, delay: number = 1000,options?:TThrottleOptions) => {
    const [lastTriggerTime,SetLastTriggerTime] = useState<number | null>(null)
    const ThrottleOptions = useMemo<TThrottleOptions>(()=> options ?? {triggerType:'leading'} ,[options])
    return (argrs:T[])=> {
      const currentTime = Date.now()
      if( lastTriggerTime == null){
        if(ThrottleOptions.triggerType == 'leading'){
          callback(...argrs)
        }
        SetLastTriggerTime(currentTime)
      }else if(currentTime - lastTriggerTime > delay){
        callback(...argrs)
        SetLastTriggerTime(currentTime)
      }
    }
};


export default useThrottle


export {
  type TThrottleOptions
}

