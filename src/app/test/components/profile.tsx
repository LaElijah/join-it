
import Image from 'next/image'
import { useRouter } from 'next/router'



export default function Profile(props: any) {
    const router = useRouter()


    return (
        <div onClick={() => {
           
            router.push(`/profile/${props.name}`)
        }}>
            <Image src="/images/profile.jpg" alt="Picture of the author" width={500} height={500} />
            <h1>{props.name}</h1>
            </div>
    )

}
