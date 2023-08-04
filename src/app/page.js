import styles from "./styles/page.module.scss"
import Onboarding from "./_components/onboarding";




export default function Index() {

    return (
        <div className={styles.container}>

            <div className={styles.hero} >
                <h1>Join-It</h1>
                <h5>alpha Demo</h5>
                <h5>Version 0.1.0</h5>
                
            </div>

            <Onboarding  />


            


     

        </div>
    )
}