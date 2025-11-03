import React from 'react'

const useEffect = (effect: () => void, deps: ReadonlyArray<any>,keepDefaultEffect?:boolean) => {
  
  // // remove the effect accorrding different envs , and when  deps is [] , remove the  duplicated render
  // let disable:boolean = true;
  // if(keepDefaultEffect) { 
  //    disable = false // keep original status
  // }else{
  //   // undifined
  //   if(keepDefaultEffect == undefined){
  //     if(deps.length == 0){
  //        // accorrding to the dev env to define the render mode
  //       disable = process.env.NODE_ENV === 'development' ? true : false
  //     }else{
  //       disable = true
  //     }
  //   }else
  //   //  don't keep duplicated render
  //   if(keepDefaultEffect == false){
  //     disable = true
  //   }
  // }
  
  const disable = React.useRef<boolean>( keepDefaultEffect ? false : (keepDefaultEffect === false || deps.length !== 0 || process.env.NODE_ENV === 'development'))

  React.useEffect(() => {
    if (disable.current) {
      disable.current = false

      return
    }

    return effect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useEffect
