import { classNames } from '@/src/utils/tools';
import type { InputHTMLAttributes, RefAttributes } from 'react';
import Styles from './index.module.scss';

type TInput = RefAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement> & {
}

// 对于基础组件的设计思想在于，看谁是主组件（权重最高和功能最重要的基础标签）来进一步封装
const Input = ({className,autoComplete,...inputPropsRest}:TInput) => {
   
    return (
        <input  {...inputPropsRest}  autoComplete={autoComplete ?? 'off'} className={classNames(Styles.input,className)} />
    )

}

export default Input

export {
    type TInput
}