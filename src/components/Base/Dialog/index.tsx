import { classNames } from '@/src/utils/tools';
import { useRef, type HTMLAttributes } from 'react';
import Styles from './index.module.scss';


type TDialog = HTMLAttributes<HTMLDialogElement> & {
    ref?:React.RefObject<HTMLDialogElement | null>,
    // defaultShowDialog?:boolean
    freezedDialog?:boolean
    dialogTitle?:HTMLAttributes<HTMLHeadingElement>['children'],
}

const Dialog = ({ref,className,children,freezedDialog = false,...restProps}:TDialog) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ref =  ref ?? useRef<HTMLDialogElement>(null)

    return (
        <dialog ref={ref} {...restProps} 
        // onSubmit={(e) => {
        //     e.stopPropagation()
        //     return e;
        // }}  
        
        className={classNames(Styles.dialog,className)}>
            <span title='close dialog' 
                onClick={()=> {
                    if(!freezedDialog) {
                        ref.current?.close()
                    }
                }}
                className={Styles.closeIcon}>
                X
            </span>
            
            {children}
        </dialog>
    )
}



export default Dialog

export {
    type TDialog
}