





import MediaItem from "@/app/_components/elements/mediaItem";
import styles from "@/app/_styles/components/mediaShelf.module.scss"

import { Media, BookData, VideoData, Metadata } from "@/app/_types/index"



export default function MediaShelf(props: any) {

    const mediaData: Media[] = props.mediaData

    const subjects: string[] = mediaData.map((item: Media) => item.subjects.map((subject) => `${subject.charAt(0).toUpperCase() + subject.slice(1)}`)).flat()
    console.log(subjects)


    const uniqueSubjects: string[] = Array.from(new Set(subjects))



    return (
        <section className={styles.container}>
            {uniqueSubjects.map((subject: string) => {
                return (
                    <section
                        className={styles.subject}
                        key={subject}
                    >
                        <h2>{subject}</h2>
                        <div className={styles.items}>
                            {mediaData.map((data: Media) => {
                                if (data.subjects.includes(`${subject.charAt(0).toLowerCase() + subject.slice(1)}`)) {
                                    return (
                                        <MediaItem
                                            {...data}
                                            key={data.key}
                                        />
                                    )
                                }
                            })}
                        </div>
                    </section>
                )
            })}

        </section>
    )
}