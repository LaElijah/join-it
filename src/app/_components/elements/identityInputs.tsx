"use client"
import { Button } from "@mantine/core"
import styles from "@/app/_styles/elements/identityInput.module.scss"
import IdentityTags from "./identityTags"
import FileUploader from "../fileUploader"


export default function IdentityInput(props: any) {



    const { state, dispatch } = props





    return (
        <div className={styles.container}>

            <div className={styles.avatarUploader} >
                <h2>Avatar</h2>

                <FileUploader
                    height={128}
                    width={128}
                    label="Upload Avatar"
                    dispatch={dispatch}
                    
                />
            </div>

            <div className={styles.inputWrapper} >

                <h2>Tags</h2>
                <IdentityTags state={state} dispatch={dispatch} />




            </div>




            <div className={styles.buttonWrapper} >
                <Button 
                className={styles.button} 
                onClick={() => {
                    dispatch({ name: "page", value: 0 })
                }} >Previous</Button>

                <Button className={styles.button} onClick={props.handleSubmit} >{state.submit}</Button>

            </div>

        </div>


    )
}