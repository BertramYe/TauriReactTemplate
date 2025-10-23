export const isEmpty = (value: any) => ['undefined', 'null', 'NaN', ''].includes(String(value)) && !Array.isArray(value)

export const removeEmptyArrayElement = (arr: any[]) => {
  if (isEmpty(arr)) {
    return []
  }

  return arr.filter(ele => !isEmpty(ele))
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


export const  classNames = (...classNameList:( CSSModuleClasses | string | undefined)[]) => {
    // filter(Boolean) remove all fake value from the array（falsy values）, includig undefined、null、false、0、NaN and empty string ""。
    const prefilterClassName = classNameList.filter(Boolean).join(" ")
    // const combined_classname = classNameList.filter(Boolean).reverse().join(" ");
    return ` ${prefilterClassName} `;
}


