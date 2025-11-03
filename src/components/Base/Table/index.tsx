
import type {HTMLAttributes, RefAttributes} from  'react';
import { classNames } from '@/src/utils/tools';
import Styles from './index.module.scss';


type TTable = RefAttributes<HTMLTableElement> & HTMLAttributes<HTMLTableElement> & {

}

const Table = ({className,children,...restProps}:TTable) => {
    return (
        <table {...restProps} className={classNames(Styles.table,className)}>
            {children}
        </table>
    )
}


export default Table



export  type{
    TTable
}