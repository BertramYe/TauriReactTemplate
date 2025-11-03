import type { OptionHTMLAttributes } from "react"
import { classNames } from '@/src/utils/tools';
import Styles from './index.module.scss'

type TOption = OptionHTMLAttributes<HTMLOptionElement> & {

}



const Option = ({className,children,...restProps}:TOption) => {


    return (
        <option {...restProps} className={classNames(Styles.option,className)}>
            {children}
        </option>
    )

}


export default Option


export {
    type TOption
}