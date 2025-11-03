import LoadingImage from '@/src/assets/image/loading.gif'
import { classNames } from "@/src/utils/tools"
import type { ButtonHTMLAttributes,ImgHTMLAttributes } from "react"
import Styles from './index.module.scss'



type TButton = ButtonHTMLAttributes<HTMLButtonElement> &{
    includeLoadingIcon?:boolean
    loadingIcon?:ImgHTMLAttributes<HTMLImageElement>['src']
}


const Button = ({includeLoadingIcon=false,type,className,disabled,children,loadingIcon,...restProps}:TButton) => {

    return (
        <button type={type ?? 'button'} disabled={disabled} {...restProps} className={classNames(Styles.button,className)}  >
            {
                includeLoadingIcon ?
                (
                    disabled ?
                    <img src={loadingIcon ?? LoadingImage} className={Styles.image} alt="loading process"  />
                    :
                    children
                )
                :
                children
            }
        </button>
    )

}

export default Button


export {
    type TButton
}