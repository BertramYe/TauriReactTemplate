import { useCallback } from "react";
import useEffect from "@/src/hooks/useEffect";
import { toast, type ToastVariant } from "@pheralb/toast";
import { useNavigate } from "react-router-dom";
type TMessager = Omit<TResponse<any>, 'data' | 'ok'> & {
  type?: ToastVariant;
  ok?:boolean
};

const useMessager = (response_state?: TMessager) => {
  const navigate = useNavigate(); 

  const ShowMessage = useCallback((message_details:{
    text:ToastVariant,
    description?:string
  })=> {
    // Show toast message based on the type
        switch (message_details.text) {
          case 'error':
            toast.error(message_details);
            break;
          case 'info':
            toast.info(message_details);
            break;
          case 'warning':
            toast.warning(message_details);
            break;
          case 'success':
            toast.success(message_details);
            break;
          case 'loading':
            toast.loading(message_details);
            break;
          default:
            toast.default(message_details);
            break;
        }
  },[])
  
  useEffect(() => {
    if(response_state){
        // Redirect if redirect_path is provided
        if (response_state.redirect_to) {
          // router.push(response_state.redirectTo);
          navigate(response_state.redirect_to);
        }
        const message_type = response_state.type ?? (response_state.ok ? 'success' : 'error');
        const message_details = {
          text: message_type,
          description: response_state.message,
        };
        ShowMessage(message_details)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response_state]);
};

export default useMessager;


export {
  type TMessager,
  toast, 
  type ToastVariant 
}