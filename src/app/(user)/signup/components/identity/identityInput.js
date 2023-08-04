"use client"
import { Button } from "@mantine/core"
import styles from "./identityInput.module.scss"
import IdentityTags from "./identityTags"
import FileUploader from "../fileUploader/fileUploader"

export default function IdentityInput(props) {



    const { state, dispatch } = props





    return (
        <div className={styles.container}>

            <div className={styles.avatarUploader} >
                <h2>Avatar</h2>

                <FileUploader
                    state={state}
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