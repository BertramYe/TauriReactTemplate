type TObject = {
  [key:string]:any
}


type TResponse<T> = {
    ok: boolean,
    message?: string,
    data?: T,
    redirect_to?:string
}


interface ICallback<T> {
    (..._argrs:T[]):void | Promise<void>
}