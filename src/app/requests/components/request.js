import styles from './request.module.scss'



export default function Request(props) {
    return (
        <div className={styles.container} >

            <section>
                <h2>@{props.username}</h2>
                <div>
                    <h2>Resource:</h2>
                    <h2>{props.resource}</h2>
                </div>
            </section>


            <section>

                <Image height={64} width={64} />
                <div>
                    <h2>{props.details}</h2>
                    <h2>Show more</h2>
                </div>


            </section>

            <section>
                <Progress />
                <h2>${props.progress}/{props.goal}</h2>
            </section>

            <section>
                <h2>Posted: {props.age}</h2>
                <div>
                    <h2>Category:</h2>
                    <h2>{props.category}</h2>
                </div>

            </section>

        </div>
    )
}