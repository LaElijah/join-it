import MediaItem from "@/app/_components/elements/mediaItem";
import styles from "@/app/_styles/components/mediaShelf.module.scss";
import { Media } from "../_types/mediaTypes";

// TODO: Update types

export default function MediaShelf(props: any) {
  const mediaData: Media[] = props.mediaData;
  console.log(mediaData[0].title)

  const uniqueSubjects: string[] = Array.from(
    new Set(
      mediaData
        .map((item: Media) => {
          return item.subjects.map((subject) => {
            return `${subject.charAt(0).toUpperCase() + subject.slice(1)}`;
          });
        })
        .flat(),
    ),
  );

  return (
    <section className={styles.container}>
      {uniqueSubjects.map((subject: string) => {
        console.log(subject)
        return (
          <section className={styles.shelf} key={subject}>
            {((mediaData.filter((data) => data.subjects.includes(`${subject.charAt(0).toLowerCase() + subject.slice(1)}`)).length > 0)) && <h2>{subject}</h2>}
            <div className={styles.items}>
              {mediaData.map(({data}: any) => {
                if (
                  data.subjects.includes(
                    `${subject.charAt(0).toLowerCase() + subject.slice(1)}`,
                  )
                ) {
                  return <MediaItem {...data._doc} key={data.key} />;
                }
              })}
            </div>
          </section>
        );
      })}
    </section>
  );
}
