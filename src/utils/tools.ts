export const isEmpty = (value: any) => ['undefined', 'null', 'NaN', ''].includes(String(value)) && !Array.isArray(value)

export const removeEmptyArrayElement = (arr: any[]) => {
  if (isEmpty(arr)) {
    return []
  }

  return arr.filter(ele => !isEmpty(ele))
}

export const removeElementFromObject = (obj: TObject,toDeleteKey:any ) => {
  const filtered: TObject = {}
  if (isEmpty(obj)) {
    return filtered
  }
  for (const [key, value] of Object.entries(obj)) {
    if (!isEmpty(key) && !(toDeleteKey.toString().trim() === key.trim())) {
      filtered[key] = value
    }
  }
  return filtered
}


export const removeEmptyObjectElement = (obj: TObject) => {
  if (isEmpty(obj)) {
    return {}
  }
  const filtered: any = {}
  for (const [key, value] of Object.entries(obj)) {
    if (!isEmpty(key) && !isEmpty(value)) {
      filtered[key] = value
    }
  }
  return filtered
}


/**
 * when import the `Styles` for current customised components, it must put in the all of the import actions end,
 * so that we can make sure the latest classnames can override the styles thst comes from the import components
 * 
 * for example: 
 * import Container,{type TContainer} from "@/components/Base/Container";
 * import { classNames } from "@/utils/tools.ts"
 * import Styles from './index.module.scss';    ，<== must be in the last to import the Styles of the current customised components
 * 
 * type TCustomisedContainer = TContainer & {
 * 
 * }
 * const CustomisedContainer = ({className,...restProps}:TCustomisedContainer) => {
 * 
 *    return (
 *        <Container className = {classNames(Styles.container,className)}>  </Container >
 *      )
 * }
 * 
 * @param classNameList new added classnames list
 * @returns new combined className
 */
export const  classNames = (...classNameList:( CSSModuleClasses | string | undefined)[]) => {
    // filter(Boolean) remove the value of the（falsy values），inluding undefined、null、false、0、NaN and empty string "".
    const prefilterClassName = classNameList.filter(Boolean).join(" ")
    // const prefilterClassName = classNameList.filter(Boolean).reverse().join(" ");
    return ` ${prefilterClassName} `;
}


export const generateUnitKey = (type?:'time') => {
    // performance.now() more accurentcy than Date.now()
    if(type == 'time'){
        return performance.now().toString().replace('.','')
    }else{
        return performance.now().toString().replace('.','')
    }
}


