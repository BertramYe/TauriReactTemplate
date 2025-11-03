import type { AxiosResponse } from 'axios';
import { AsyncExceptioner } from '@/src/utils/exceptions_handler';
import {type TSchema,TokenValidSchema } from './schemas'
import Token from './tokener';

const PreParseRequestData  = async (param?:TObject | FormData,withToken?:boolean,parseSchem?:TSchema):Promise<TObject> => {
  param = param ?? {} 
  withToken = withToken == undefined ? true : withToken
  if( param  instanceof  FormData){
        const formDataObject = Object.fromEntries(param)
        param = {
          ...formDataObject
        }
  }
  param = parseSchem ? await parseSchem.parseAsync(param) : param
  if(withToken) {
    //  need put the token in the request header
    await TokenValidSchema.parseAsync(Token.get())
    //  need put the token in the request
    // const token_param = await TokenValidSchema.parseAsync(Token.get()) 
    // param = {
    //   ...param,
    //   ...token_param,
    // }
  }
  return param
}

interface IRequestWrapper {
     (CallBack:IRequestCallBack,url: string, param?: TObject | FormData, withToken?: boolean, parseSchem?: TSchema): Promise<TResponse<TObject>>
}
interface IRequestCallBack {
  (url: string, param?: TObject | FormData): Promise<AxiosResponse<any, any, TObject>['data']>
}


const RequestWrapper:IRequestWrapper = async(CallBack:IRequestCallBack, url, param, withToken, parseSchem) => {
    return await AsyncExceptioner(async (Response: TResponse<TObject>) => {
        const pre_handle_params = await  PreParseRequestData(param,withToken,parseSchem)
        const result_data = await CallBack(url, pre_handle_params)
        // 以下是自定义的处理流程
        Response.ok = result_data.status === "success"
        if(Response.ok){
          Response.data = result_data.data ?? result_data ??  {}
        }
        Response.message = result_data.msg ?? result_data.message ?? result_data.statusText
        return Response;
    });
}




export {
    type TSchema,
    RequestWrapper
}