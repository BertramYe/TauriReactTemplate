type TToken = {
    api_token:string | null
}



const Token = {
    get():TToken  {
        return {
            api_token:window.localStorage.getItem("Token")
        }
    },
    update (new_token:string | null) {
        if(new_token){
            window.localStorage.setItem("Token",new_token);
        }
        return {
            api_token:new_token
        }
    },
}

export {
    type TToken
}


export default Token



