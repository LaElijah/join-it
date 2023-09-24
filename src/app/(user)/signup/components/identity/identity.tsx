
import styles from "./identity.module.scss"
import IdentityInput from "./identityInput"




export default function Credentials(props) {

    const { state, dispatch } = props

    return (
        <div className={styles.container}>
            <section className={styles.wrapper}>

                <h2>Your identity</h2>
                <p>Describe your identity here </p>


                <IdentityInput handleSubmit={props.handleSubmit} state={state} dispatch={dispatch} />



             
            </section>



        </div>


    )
}