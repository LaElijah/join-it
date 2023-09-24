
import styles from './request.module.scss'
import Image from 'next/image'
import Progress from './progress'
import Link from 'next/link'
import { useRouter } from 'next/navigation'



export default function Request(props: any) {

    const router = useRouter()
    const handleClick = () => {
        router.push(props.url)
    }

    return (
        <div onClick={handleClick} className={styles.container} >

            

            <section className={styles.header}>
                <h2>@{props.username}</h2>
                <div className={styles.resource}>
                    <h2 >Resource:</h2>
                    <h2>{props.resource}</h2>
                </div>
            </section>


            <section className={styles.details}>

                <Image height={64} width={64} alt="" src={props.image}/>
                <div className={styles.description}>
                    <h2 className={styles.body}>{props.details}</h2>
                    <Link href={"/link"} className={styles.link}>Show more</Link>
                </div>


            </section>

            <section className={styles.progress} >
                <Progress value={props.progress} />
                {/* <h2>${props.progress}/{props.goal}</h2> */}
            </section>

            <section className={styles.footer} >
                <h2>Posted: {props.date}</h2>
                <div className={styles.category}>
                    <h2>Category:</h2>
                    <h2>{props.category}</h2>
                </div>

            </section>

            {/* <section >
                <Link className={styles.link} href="">Get connected</Link>
            </section> */}



        </div>
    )
}