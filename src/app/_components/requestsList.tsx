import styles from '@/app/_styles/components/list.module.scss'
import Request from './elements/request'

export default function RequestsList({ requests }: any) {

    const data = requests || [

        {
            _id: "none",
            username: "None",
            resource: "None",
            details: "None",
            progress: "None",
            goal: "None",
            category: "None",
            url: "None",
            image: "/assets/placeholder.png",
            date: "01/01/1970"
        }

    ]


    return (

        <section className={styles.list}>


            {data.map((data: any) => {
                let date = new Date(data.date)
                return (
                    <Request
                        key={data._id}
                        username={data.username}
                        resource={data.resource}
                        details={data.details}
                        progress={data.progress}
                        goal={data.goal}
                        category={data.category}
                        url={`/requests/${data._id}`}
                        image={data.image}
                        date={date.toLocaleDateString()}
                        id={data._id}
                    />
                )
            })}

        </section>


    )
}

