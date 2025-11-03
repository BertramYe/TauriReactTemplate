
import Button,{ type TButton } from "@/src/components/Base/Button"
import Dialog,{ type TDialog } from "@/src/components/Base/Dialog"
import {useRef, type HTMLAttributes } from "react";
import { classNames } from "@/src/utils/tools";
import Container from "@/src/components/Base/Container";
import Styles from './index.module.scss';


type TDialogBtn = Omit<TDialog, 'ref'|'onMouseDown' | 'freezedDialog'> & {
    dialogTitle?:HTMLAttributes<HTMLHeadingElement>['children'],
    btnContent?:TButton['children'],
    disabled?: TButton['disabled'],
    startDialogBtnClassName?: TButton['className']
    onShowDialog?: () => boolean | Promise<boolean>,
    dialogRef?:TDialog['ref']
}


const DialogBtn = ({dialogRef,dialogTitle,btnContent,children,onShowDialog,disabled,startDialogBtnClassName,...restProps}:TDialogBtn) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    dialogRef = dialogRef ?? useRef<HTMLDialogElement>(null)

    return (
        <>
            <Button className={classNames(Styles.startDialogBtn,startDialogBtnClassName)} 
                // 下面这个防止传染 onMouseDown 事件
                onMouseDown={(e) => e.stopPropagation()}
                disabled = {disabled} onClick={async() => {
                    let showDialogModel = true;
                    if(onShowDialog){
                        showDialogModel = await onShowDialog();
                    }
                    if(showDialogModel){
                        dialogRef.current?.showModal();
                    }
                }}> 
                {btnContent} 
            </Button>
            <Dialog  {...restProps} ref={dialogRef} freezedDialog={disabled} onMouseDown={(e) => e.stopPropagation()}   >
                <Container className={Styles.chidrenContainer}>
                    {
                        dialogTitle && <h1>
                            {dialogTitle}
                        </h1>
                    }
                    {children}
                </Container>
            </Dialog>
        </>
    )
}

export default DialogBtn



export {
    type TDialogBtn
}