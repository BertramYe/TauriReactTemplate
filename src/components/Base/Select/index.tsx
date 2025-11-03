

import type { RefAttributes, SelectHTMLAttributes } from 'react'
import { classNames } from '@/src/utils/tools'
import Styles from './index.module.scss';



type TSelect = RefAttributes<HTMLSelectElement> & SelectHTMLAttributes<HTMLSelectElement> & {

}


const Select = ({className,children,...restProps}:TSelect) => {


    return (
        <select {...restProps} className={classNames(Styles.select,className)}>
            {children}
        </select>
    )
}

export default Select