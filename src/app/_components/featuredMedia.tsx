

import styles from "@/app/_styles/components/featuredMedia.module.scss"
import { Media, BookData, VideoData, Metadata } from "@/app/_types/index"
import Image from "next/image"




const MediaContent = ({type, data}: any) => {
    
}

export default function FeaturedMedia(props: { mediaData: Media }) {

    const { title, type, subjects, metadata, reactions, data } = props.mediaData


    if (type === "book") {
        return (
            <div className={styles.container}>
                <h1>Featured Media</h1>
                <img 
                height={200}
                width={200}
                src={(data as BookData).cover} 
                alt="Book Cover"  
                />
            </div>
        )
    }
    else if(type === "video") {
        return (
            <div className={styles.container}>
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