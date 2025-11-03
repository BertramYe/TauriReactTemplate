
import { useState } from "react";
import { useMessager } from "@/src/hooks";
import Container from "@/src/components/Base/Container";
import Input from "@/src/components/Base/Input";
import Button from "@/src/components/Base/Button";
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
import { invoke } from "@tauri-apps/api/core";
import Logo from '@/src/assets/image/logo.ico'
import Styles from './index.module.scss'

const HomePage = () => {

    const [message,setGreetMsg] = useState<TResponse<string>>()
    const [name,setName] = useState<string | undefined>()
    useMessager(message)
    return (
        <Container className={Styles.container}>
            <h1>TauriReactTemplate</h1>
            <img src={Logo} alt="TauriReactTemplate" />
            <Input className={Styles.input} type="text" placeholder="please input your name" onChange={(e) => setName(e.currentTarget.value)}/>
            <Button className={Styles.button}  onClick={async()=>setGreetMsg(await invoke<TResponse<string>>("greet", { name }))}> greet </Button>
        </Container>
    )

}

export default HomePage