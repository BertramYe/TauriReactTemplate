import Container  from "@/src/components/Base/Container";
import Input,{type TInput} from "@/src/components/Base/Input";
import { classNames } from "@/src/utils/tools";
import type { DOMAttributes } from "react";
import Styles from './index.module.scss';

type TOption = {
    key:string,
    value:string | number | undefined
}

type TDropDown = Omit<TInput, 'defaultValue' | 'onChange'> & {
    onSelected?:(option:TOption) => void,
    Options?:{
        [key in string]: TOption['value']
    },
    onRenderOption?: (option:TOption) => DOMAttributes<HTMLLIElement>['children'] 
}


const DropDown = ({className,type,onSelected,
                    onRenderOption,value,
                    Options,...restProps}:TDropDown) => {
    return (
        <Container className={Styles.container}>
            <Container className={Styles.inputContainer} >
                <Input {...restProps} type={type ?? 'text'} 
                value={value ?? ''}
                defaultValue={Options ? Options[Object.keys(Options)[0]]: ''}
                className={classNames(Styles.input,className)} readOnly/>
                <span className={classNames(Styles.dropIcon)}>{`<`}</span>
            </Container>
            <ul className={Styles.optionsContainer}>
                {
                    Options && 
                    Object.keys(Options).map((key,key_index) => (
                        <li key={key_index} 
                            className={Styles.option}
                            onMouseDown={() => {
                                // when the chidren alert its children，use the stopPropagation to avoid triger the  `onMouseDown ` of its father element
                                // e.stopPropagation()
                                if(onSelected){
                                    onSelected({key,value: Options[key]})
                                }
                            }}
                            >
                            {
                                onRenderOption ? onRenderOption({key,value: Options[key]}): 
                                Options[key]
                            }
                        </li>
                    ))
                }
            </ul>
        </Container>
    )
}

export default DropDown


export {
    type TDropDown,
    type TOption
}