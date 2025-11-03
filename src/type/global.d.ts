type TObject = {
  [key:string]:any
}


type TResponse<T> = {
    ok: boolean,
    message?: string,
    data?: T,
    redirect_to?:string
}

interface ICallBack<T> {
    (...args: any[]):T
}

interface IAsyncCallBack<T> {
    (...args: any[]): Promise<T>
}