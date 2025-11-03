import { useState } from "react";
import Button,{ type TButton} from "@/src/components/Base/Button"
import Form,{ type TForm } from "@/src/components/Base/Form";
import { useActionState,type IAction,type TState } from "@/src/hooks";
import DialogBtn,{type TDialogBtn} from "@/src/components/Project/DialogBtn";
import Container from "@/src/components/Base/Container";
import Styles from './index.module.scss';

type TDialogForm = Omit<TDialogBtn, 'children'> & {
    actionFn?:IAction<FormData>
    children?:TForm['children'],
    submitBtnList:TButton['children'][]
}


const DialogForm = ({actionFn,children,disabled,submitBtnList,...restProps}:TDialogForm) => {
    const [actionType,setActionType] = useState<TButton['children']>(submitBtnList[0])
    const [_state, action, isPending] = useActionState<FormData>(async(_pre:TState,formData:FormData) => {
        if(actionFn){
            formData.append('actionType',`${actionType}`)
            return await actionFn(_pre,formData)
        }
    },undefined)

    return (
        <DialogBtn {...restProps} disabled={disabled || isPending} >
            <Form action={action} className={Styles.createFrom} >
                {
                    children
                }
                <Container className={Styles.submitBtnContainer}>
                    {
                        submitBtnList.map((
                            submitChidren,submit_index
                        ) => (
                            <Button 
                                key={submit_index} type={'submit'} disabled={disabled || isPending} 
                                className={Styles.toSubmitBtn}
                                onClick={() =>{
                                        // before onSubmit, it will trigger current event
                                       setActionType(submitChidren)
                                } }
                                includeLoadingIcon={actionType === submitChidren} 
                                >
                                {submitChidren}
                            </Button>
                        ))
                    }
                </Container>
            </Form>
        </DialogBtn>
    )
}

export default DialogForm



export {
    type TDialogForm
}