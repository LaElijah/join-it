"use client"

import styles from './list.module.scss'
import Request from './request.js'



export default function RequestList(props) {

   
 
    const requests = props.data

    const data = requests.data || [{ 
        username: "Loading",
        resource: "Loading",
        details: "Loading",
        progress: "Loading",
        goal: "Loading",
        category: "Loading",
        url: "Loading",
        image: "/placeholder.png"

    }
]





    return (
        <div className={styles.list}>

            {data.map((data, index) => {
                let date = new Date(data.date)
                return (
                    <Request
                        key={index}
                        username={data.username}
                        resource={data.resource}
                        details={data.details}
                        progress={data.progress}
                        goal={data.goal}
                        category={data.category}
                        url={`/requests/${data._id}`}
                        image={data.image}
                        date={date.toLocaleDateString()}
                    />
                )
            })}
        </div>
    )
}

