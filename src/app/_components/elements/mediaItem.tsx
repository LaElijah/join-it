import styles from "@/app/_styles/elements/mediaItem.module.scss";
import { Media, BookData } from "@/app/_types/mediaTypes";
import Link from "next/link";

export default function MediaItem(props: Media) {
  if (props.type === "book") {
    const item = props.data as BookData;
    return (
      <Link href={`/bookshelf/${item.key}`} className={styles.container}>
        {/* {
                    item?.isbn
                    && <p>ISBN: {item.isbn}</p>
                } */}
        {item?.cover && (
          <img src={item.cover} alt="cover" width={200} height={104} />
        )}
        {/* {
                    item?.publisher
                    && <p>Publisher: {item.publisher}</p>
                }
                {
                    item?.datePublished
                    && <p>Date Published: {item.datePublished}</p>
                }
                {
                    item?.language
                    && <p>Language: {item.language}</p>
                }
                {
                    item?.description
                    && <p>Description: {item.description}</p>
                }
                {
                    item?.authors
                    && <p>Authors: {item.authors.join(", ")}</p>
                }
                {
                    item?.keywords
                    && <p>Keywords: {item.keywords.join(", ")}</p>
                } */}
      </Link>
    );
  }
  // else if (props.type === "video") {
  //     let item = props.data as VideoData

  //     return (
  //         <div className={styles.container}>
  //             <p>Video</p>
  //             {item && <p>{item.description}</p>}
  //         </div>
  //     )
  // }
}
