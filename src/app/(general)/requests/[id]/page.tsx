import Image from "next/image";
import Link from "next/link";

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
    const { post, userData } = data
    const { username, profile, id, identity } = userData
   const {
    date,
    resource,
    details,
    progress,
    goal,
    category,
    description,
    metric,
    image
   } = post

    return ( 
        <div>

            <Link href={`/requests/create`}>Create a post</Link>
            <section>
                <h1>{username}</h1>
                <Image
                    width={100}
                    height={100}
                    src={image}
                />
                <p>{description}</p>
                <p>{category}</p>
                <p>{metric}</p>
                <p>{goal}</p>
                <p>{progress}</p>
                <p>{details}</p>
                <p>{date}</p>
        
                <p>{metric}</p>
              
                <h2>Requesting: {resource}</h2>
                
                </section>
            </div>


    )
}