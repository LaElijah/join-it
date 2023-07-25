import styles from './list.module.scss'

async function getData() {
    const response = await fetch('http://localhost:3000/api/requests', {
        method: 'GET',
        next: {
            revalidate: 1,
        }
    })
    const data = await response.json();
    console.log(data);
    return data;
}


export default async function ResourceList() {

    const requests = await getData();

    const data = requests.data || [{
        name: "Lael",
        request: "Food",
        details: "I need food",
        progress: 100,
        goal: 100,
        age: "1 day ago",
        category: "Food"
    },
    {
        name: "Lael",
        request: "Food",
        details: "I need food",
        progress: 100,
        goal: 100,
        age: "1 day ago",
        category: "Food"
    },
]

    return (
        <div className={styles.list}>

            {data.map((data, index) => {
                return (
                    <Request
                        key={index}
                        username={data.name}
                        resource={data.request}
                        details={data.details}
                        progress={data.progress}
                        goal={data.goal}
                        age={data.age}
                        category={data.category}
                    />
                )
            })}
        </div>
    )
}

