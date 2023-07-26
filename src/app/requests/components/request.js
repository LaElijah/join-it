
import styles from './request.module.scss'
import Image from 'next/image'
import Progress from './progress.js'
import Link from 'next/link'


export default function Request(props) {
    return (
        <div className={styles.container} >

            

            <section className={styles.header}>
                <h2>@{props.username}</h2>
                <div className={styles.resource}>
                    <h2 >Resource:</h2>
                    <h2>{props.resource}</h2>
                </div>
            </section>


            <section className={styles.details}>

                <Image height={64} width={64} alt="" />
                <div className={styles.description}>
                    <h2>{props.details}</h2>
                    <Link href={"/link"} className={styles.link}>Show more</Link>
                </div>


            </section>

            <section className={styles.progress} >
                <Progress value={50} />
                {/* <h2>${props.progress}/{props.goal}</h2> */}
            </section>

            <section className={styles.footer} >
                <h2>Posted: {props.age}</h2>
                <div className={styles.category}>
                    <h2>Category:</h2>
                    <h2>{props.category}</h2>
                </div>

            </section>

            <section>
                <Link href="">Get connected</Link>
            </section>



        </div>
    )
}