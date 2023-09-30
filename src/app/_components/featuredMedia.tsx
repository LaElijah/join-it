

import styles from "@/app/_styles/components/featuredMedia.module.scss"
import { Media, BookData, VideoData, Metadata } from "@/app/_types/index"
export default function FeaturedMedia(props: {mediaData: Media}) {

const { title, type, subjects, metadata, reactions, data } = props.mediaData


    return (
        <div className={styles.container}>

            <div className={styles.media}>
                <img src="https://picsum.photos/200/300" alt="cover" />
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