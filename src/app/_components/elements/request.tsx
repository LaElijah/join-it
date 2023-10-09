
import styles from '@/app/_styles/elements/request.module.scss'
import Image from 'next/image'
import Progress from './progress'
import Link from 'next/link'


// TODO: Add a link to the user's profile
// TODO: Add goal and a segemted progress bar

export default function Request(props: any) {
    

    const { url, username, resource, details, progress, goal, category, image, date, id } = props
console.log(props)
  console.log(props.username)


    return (
        <div className={styles.container} >

            

            <section className={styles.header}>
                <h2>@{username}</h2>
                <div className={styles.resource}>
                    <h2 >Resource:</h2>
                    <h2>{resource}</h2>
                </div>
            </section>


            <section className={styles.details}>

                <Image height={64} width={64} alt="" src={image}/>
                <div className={styles.description}>
                    <h3 className={styles.body}>{details}</h3>
                    <Link href={`/requests/${id}`} className={styles.link}>Show more</Link>
                </div>


            </section>

            <section className={styles.progress} >
                <Progress value={progress} />
                {/* <h2>${props.progress}/{props.goal}</h2> */}
            </section>

            <section className={styles.footer} >
                <h2>Posted: {date}</h2>
                <div className={styles.category}>
                    <h2>Category:</h2>
                    <h2>{category}</h2>
                </div>

            </section>

            {/* <section >
                <Link className={styles.link} href="">Get connected</Link>
            </section> */}



        </div>
    )
}