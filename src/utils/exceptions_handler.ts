import { ZodError } from "zod"

const ParseExceptionErrors = (error:unknown):string => {
    if (error instanceof ZodError) {
        // default only get the first error of all of the error messages
        const first_failed_issue = error.issues[0]
        console.log("ZodError: ",error.issues)
        return first_failed_issue.message
    }else{
        console.log('normal error',error)
        const error_message = (error as {message:string}).message
        console.log('normal error message',error_message)
        return error_message
    }
}

const AsyncExceptioner = async <T,>(CallBack:IAsyncCallBack<TResponse<T>>,...args: any[]) =>{
    let Response: TResponse<T> = {
        ok: false,
        message:"something unknow happend !"
    }
    try {
        const response = await CallBack(Response,...args)
        Response = {
            ...Response,
            ...response,
        }
    } catch (error) {
        Response.message = ParseExceptionErrors(error)
    }
    return Response
}

const Exceptioner = <T,>(CallBack:ICallBack<TResponse<T>>,...args: any[]) =>{
    let Response: TResponse<T> = {
        ok: false,
        message:"something unknow happend !"
    }
    try {
        const response = CallBack(Response,...args)
        Response = {
            ...Response,
            ...response,
        }
    } catch (error) {
        Response.message = ParseExceptionErrors(error)
    }
    return Response
}

export {
    AsyncExceptioner,
    Exceptioner
}