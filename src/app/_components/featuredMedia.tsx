

import styles from "@/app/_styles/components/featuredMedia.module.scss"
import { Media, BookData, VideoData, Metadata } from "@/app/_types/index"
import Image from "next/image"




const MediaContent = ({type, data}: any) => {
    if (type === "book") {
        return (
            <div className={styles.media}>
                <img src={(data as BookData).cover} alt="cover"  />
            </div>
        )
    }
    else if(type === "video") {
        return (
            <div className={styles.media}>
                <iframe
                    width="707"
                    height="480"
                    src={data.url as string}
                    title="Think Tanks: How Fake Experts Shape the News"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
            </div>
        )
    }
}

export default function FeaturedMedia(props: { mediaData: Media }) {

    const { title, type, subjects, metadata, reactions, data } = props.mediaData



    return (
        <div className={styles.container}>

            <div className={styles.media}>
                <MediaContent 
                type={type}
                data={data}
                />
                
            </div>

            <div className={styles.info}>
                <h3>{title}</h3>
                <p>{type}</p>
                <p>{subjects.join(", ")}</p>
                <p>{metadata.submittedBy}</p>
                <p>{metadata.verified ? "Verified" : "Not Verified"}</p>
                <p>{metadata.dateSubmitted}</p>
                <p>{reactions.length}</p>
                <p>{data.description}</p>

            </div>





        </div>
    )
}