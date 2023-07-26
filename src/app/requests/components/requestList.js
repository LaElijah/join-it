"use client"

import styles from './list.module.scss'
import Request from './request.js'



export default function RequestList(props) {

   
 
    const requests = props.data

    const data = requests.data || [{ 
        username: "Lael",
        name: "Lael",
        resource: "Food",
        details: "I need food",
        progress: 100,
        goal: 100,
        age: "1 day ago",
        category: "Food",
        date: new Date()

    },
    {
        username: "Lael",
        name: "Lael",
        resource: "Food",
        details: "I need food",
        progress: 100,
        goal: 100,
        age: "1 day ago",
        category: "Food",
        date: new Date()
    },
]





    return (
        <div className={styles.list}>

            {data.map((data, index) => {
                let age = new Date - data.date
                return (
                    <Request
                        key={index}
                        username={data.username}
                        resource={data.resource}
                        details={data.details}
                        progress={data.progress}
                        goal={data.goal}
                        age={age}
                        category={data.category}
                    />
                )
            })}
        </div>
    )
}

