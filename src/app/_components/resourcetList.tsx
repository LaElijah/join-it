import styles from './resourceList.module.scss'

async function getData(){
  const response = await fetch('http://localhost:3000/api/resources', {
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
 
    const resources = await getData();
    const data = resources.data || [{
        name: "No Resources",
        request: "No Resources"


    }];
    
    return (
        <div className={styles.list}>
           
            {data.map((data: any, index: any) => {
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

