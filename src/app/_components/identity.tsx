
import styles from "@/app/styles/components/identity.module.scss"
import IdentityInputs from "./elements/identityInputs"




export default function Credentials(props: any) {

    const { state, dispatch } = props

    return (
        <div className={styles.container}>
            <section className={styles.wrapper}>

                <h2>Your identity</h2>
                <p>Describe your identity here </p>


                <IdentityInputs handleSubmit={props.handleSubmit} state={state} dispatch={dispatch} />



             
            </section>



        </div>


    )
}