
import { useState } from "react";
import useMessager from "@/src/hooks/useMessager";
import Styles from './index.module.scss'
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
import { invoke } from "@tauri-apps/api/core";
import Logo from '@/src/assets/image/logo.ico'

const HomePage = () => {

    const [message,setGreetMsg] = useState<TResponse<string>>()
    const [name,setName] = useState<string | undefined>()
    useMessager(message)

    return (
        <div className={Styles.container}>
            <h1>TauriReactTemplate</h1>
            <img src={Logo} alt="TauriReactTemplate" />
            <input className={Styles.input} type="text" placeholder="please input your name" onChange={(e) => setName(e.currentTarget.value)}/>
            <button className={Styles.button}  onClick={async()=>setGreetMsg(await invoke<TResponse<string>>("greet", { name }))}> greet </button>
        </div>
    )

}

export default HomePage