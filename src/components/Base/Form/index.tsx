
import { type FormHTMLAttributes, type RefAttributes } from "react";
import { classNames } from "@/src/utils/tools";
import Styles from './index.module.scss';



type TForm =  FormHTMLAttributes<HTMLFormElement> & RefAttributes<HTMLFormElement> & {

}




const Form = ({className,children,ref,...restFormProps}:TForm) => {
    
    return (
        <form ref={ref} {...restFormProps} className={classNames(Styles.form,className)}>
            {children}
        </form>
    )
}

export default Form


export {
    type TForm
}