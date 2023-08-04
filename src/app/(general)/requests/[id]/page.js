

const getPost = async (id) => {
    const response = await fetch(`http://localhost:3000/api/requests/${id}`, {
        method: 'GET',
        headers: {  
            'Content-Type': 'application/json',
            'query': id,
        },
        next: {
            revalidate: 0,
        },
    })
    const data = await response.json();
    console.log(data)
    return data;
}


export default async function Post({ params }) {

    const response = await getPost(params.id)
    const { data, status } = response

    return ( 
        <div>
            <h1>{data.image}</h1>
        </div>


    )
}