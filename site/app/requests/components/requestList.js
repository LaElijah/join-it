import styles from './list.module.scss'

async function getData(){
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
        name: "No Requests",
        request: "No Requests"


    }];
    
    return (
        <div className={styles.list}>
           
            {data.map((data, index) => {
                return (
                    <div key={index}>
                        <h2>{data.name}</h2>
                        <h4>{data.request}</h4>
                    </div>
                )
            })}
        </div>
    )
}
