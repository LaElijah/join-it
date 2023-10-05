



import styles from "@/app/_styles/elements/mediaItem.module.scss"
import { Media, MediaData, BookData, VideoData } from "@/app/_types"
import Image from "next/image"


export default function MediaItem(props: Media) {
    

    if (props.type === "book") {
        const item = props.data as BookData
        return (
            <div className={styles.container}>
                {item?.isbn && <p>ISBN: {item.isbn}</p>}
                {item?.cover && <Image src={item.cover} alt="cover"/>}
                {item?.publisher && <p>Publisher: {item.publisher}</p>}
                {item?.datePublished && <p>Date Published: {item.datePublished}</p>}
                {item?.language && <p>Language: {item.language}</p>}
                {item?.description && <p>Description: {item.description}</p>}
                {item?.authors && <p>Authors: {item.authors.join(", ")}</p>}
                {item?.keywords && <p>Keywords: {item.keywords.join(", ")}</p>}
            </div>
        )
    }
    else if (props.type === "video") {
        let item = props.data as VideoData

    return (
        <div className={styles.container}>
            <p>Video</p>
            {item && <p>{item.description}</p>}
        </div>
    )
}
}