import { LinearProgress } from '@mui/material';
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


export default async function RequestList() {
   


    

    const requests = await getData();
    const data = requests.data || [{
        name: "No requests",
        request: "No requests"


    }];

    return (
        <div className={styles.list}>

            {data.map((data, index) => {
                return (
                    <li className={styles.listItem} key={index}>

                        <div>
                            <h2>{data.name}</h2>
                        </div>

                        <div>
                            <Image src={"https://placehold.co/48x48"} alt={data.name} width={48} height={48} />
                            <h4>{data.request}</h4>
                        </div>
                        
                        <div>
                            <LinearProgress variant="determinate" value={100} />
                        </div>

                    </li>
                )
            })}
        </div>
    )
}

